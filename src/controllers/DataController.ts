// src/controllers/DataController.ts

import { Request, Response } from 'express';
import { externalDataService } from '../services/ExteralDataService';
import { dataRepository } from '../services/DataRepository';
import { generateCsv } from '../utils/csvGenerator';
import { QueryParamsDTO } from '../dtos/Item.dto';

export class DataController {

    /**
     * POST /api/external-data: Extrae data de la API externa y la almacena.
     */
    public async postExternalData(req: Request, res: Response): Promise<void> {
        try {
            // 1. Extraer data de la API Externa
            const items = await externalDataService.fetchAndProcessTopStories();

            if (items.length === 0) {
                res.status(404).json({ message: 'No new stories found or data fetching failed.' });
                return;
            }

            // 2. Almacenar data en Supabase
            await dataRepository.bulkInsertItems(items);

            res.status(201).json({ 
                message: `Successfully fetched and stored ${items.length} items.`,
                count: items.length
            });

        } catch (error) {
            console.error('Error in postExternalData:', error);
            // Uso de IA: Se puede pedir un snippet para un error 500 estándar.
            res.status(500).json({ 
                message: 'An internal server error occurred during data processing.',
                error: (error as Error).message 
            });
        }
    }

    // ---

    /**
     * GET /api/data: Devuelve datos almacenados con filtros y paginado.
     */
    public async getData(req: Request, res: Response): Promise<void> {
        try {
            // Extracción y default values para los query params
            const params: QueryParamsDTO = {
                page: parseInt(req.query.page as string) || 1,
                limit: parseInt(req.query.limit as string) || 10,
                title: req.query.title as string,
                author: req.query.author as string,
                sortField: req.query.sortField as QueryParamsDTO['sortField'] || 'created_at',
                sortOrder: req.query.sortOrder as QueryParamsDTO['sortOrder'] || 'desc',
            };

            // 1. Obtener data del repositorio con los parámetros
            const { data, total } = await dataRepository.getItems(params);

            // Cálculo de paginado (valor añadido)
            const totalPages = Math.ceil(total / params.limit);

            res.status(200).json({ 
                data, 
                metadata: {
                    totalRecords: total,
                    currentPage: params.page,
                    perPage: params.limit,
                    totalPages: totalPages,
                    filters: { title: params.title, author: params.author }
                }
            });

        } catch (error) {
            console.error('Error in getData:', error);
            res.status(500).json({
                message: 'An internal server error occurred during data retrieval.',
                error: (error as Error).message 
            });
        }
    }

    // ---

    /**
     * GET /api/export-csv: Genera y permite la descarga de un CSV con todos los datos.
     */
    public async exportCsv(req: Request, res: Response): Promise<void> {
        try {
            // 1. Obtener toda la data
            const data = await dataRepository.getAllItems();
            
            if (data.length === 0) {
                res.status(404).json({ message: 'No data found to export.' });
                return;
            }

            // 2. Generar el string CSV
            const csvString = generateCsv(data);

            // 3. Establecer headers para la descarga
            res.header('Content-Type', 'text/csv');
            res.attachment(`data-export-${Date.now()}.csv`); // Establece el nombre del archivo
            
            // 4. Enviar el archivo
            res.send(csvString);

        } catch (error) {
            console.error('Error in exportCsv:', error);
            res.status(500).json({
                message: 'An internal server error occurred during CSV export.',
                error: (error as Error).message 
            });
        }
    }
}

export const dataController = new DataController();