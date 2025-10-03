// src/services/DataRepository.ts

import { supabase } from '../config/supabase.config';
import { DBItemDTO, HackerNewsItemDTO, QueryParamsDTO } from '../dtos/Item.dto';

const TABLE_NAME = 'hn_items';

export class DataRepository {

    /**
     * Almacena múltiples ítems en la base de datos (Upsert para evitar duplicados).
     * @param items Array de ítems de Hacker News para almacenar.
     */
    public async bulkInsertItems(items: HackerNewsItemDTO[]): Promise<void> {
        // Mapeamos los datos de la API al formato de la DB (DBItemDTO)
        const dbItems: DBItemDTO[] = items.map(item => ({
            id: item.id,
            by: item.by,
            title: item.title,
            url: item.url || null, // Asegurar que null se guarda si no hay URL
            score: item.score,
            time: item.time,
            type: item.type,
            // 'created_at' se llena automáticamente por Supabase
        }));

        console.log(`Attempting to insert/update ${dbItems.length} items...`);

        // Usamos upsert para: 1. Insertar si no existe. 2. Actualizar si ya existe.
        const { error } = await supabase
            .from(TABLE_NAME)
            .upsert(dbItems, {
                onConflict: 'id', // Conflicto basado en la PK (id)
                ignoreDuplicates: false // Permite la actualización si hay conflicto
            });

        if (error) {
            console.error('Error during bulk insertion:', error);
            throw new Error('Database error during data storage.');
        }

        console.log(`Successfully stored/updated ${dbItems.length} items.`);
    }

    /**
     * Recupera datos con filtros, paginado y ordenamiento.
     */
    public async getItems(params: QueryParamsDTO): Promise<{ data: DBItemDTO[], total: number }> {
        const { page = 1, limit = 10, title, author, sortField = 'created_at', sortOrder = 'desc' } = params;

        // 1. Paginado (Cálculo de offset y limit)
        const start = (page - 1) * limit;
        const end = start + limit - 1;

        // 2. Consulta inicial con conteo total
        let query = supabase.from(TABLE_NAME).select('*', { count: 'exact' });

        // 3. Aplicar Filtros Dinámicos
        if (title) {
            // Filtrar por título usando 'ilike' (case-insensitive partial match)
            query = query.ilike('title', `%${title}%`);
        }
        if (author) {
            // Filtrar por autor (match exacto)
            query = query.eq('by', author);
        }

        // 4. Aplicar Ordenamiento
        const ascending = sortOrder === 'asc';
        query = query.order(sortField, { ascending });

        // 5. Aplicar Paginado
        query = query.range(start, end);

        const { data, count, error } = await query;

        if (error) {
            console.error('Error fetching items with query:', error);
            throw new Error('Database error during data retrieval.');
        }

        return {
            data: data as DBItemDTO[],
            total: count || 0,
        };
    }

    /**
     * Recupera TODOS los datos (usado para la exportación a CSV).
     */
    public async getAllItems(): Promise<DBItemDTO[]> {
        const { data, error } = await supabase
            .from(TABLE_NAME)
            // Se usa .select('*') sin .range() para obtener todos.
            // .limit(10000) puede ser una buena práctica en la vida real para limitar si la tabla es enorme.
            .select('*'); 

        if (error) {
            console.error('Error fetching ALL items:', error);
            throw new Error('Database error during CSV export retrieval.');
        }

        return data as DBItemDTO[];
    }
}

export const dataRepository = new DataRepository();