// src/utils/csvGenerator.ts

import { parse } from 'json2csv';
import { DBItemDTO } from '../dtos/Item.dto';

/**
 * Convierte un array de objetos (DBItemDTO) a un string con formato CSV.
 * @param data Array de datos a convertir.
 * @returns String con el contenido CSV.
 */
export function generateCsv(data: DBItemDTO[]): string {
    if (data.length === 0) {
        return '';
    }

    // Definimos los campos (headers) que queremos en el CSV.
    // Usamos las claves del DTO de la DB.
    const fields = [
        { label: 'ID', value: 'id' },
        { label: 'Autor', value: 'by' },
        { label: 'Título', value: 'title' },
        { label: 'URL', value: 'url' },
        { label: 'Puntuación', value: 'score' },
        { label: 'Fecha HN (UNIX)', value: 'time' },
        { label: 'Tipo', value: 'type' },
        { label: 'Almacenado en DB', value: 'created_at' },
    ];

    try {
        const csv = parse(data, { fields, withBOM: true }); // BOM asegura compatibilidad con caracteres especiales en Excel.
        return csv;
    } catch (err) {
        console.error('Error generating CSV:', err);
        throw new Error('Failed to generate CSV file.');
    }
}