// src/dtos/Item.dto.ts

/**
 * Interfaz que representa la estructura de un ítem (historia)
 * tal como la devuelve la API de Hacker News.
 */
export interface HackerNewsItemDTO {
    id: number;
    deleted?: boolean;
    type: 'job' | 'story' | 'comment' | 'poll' | 'pollopt';
    by: string;
    time: number; // UNIX timestamp
    text?: string;
    dead?: boolean;
    parent?: number;
    poll?: number;
    kids?: number[]; // IDs de comentarios
    url?: string;
    score: number;
    title: string;
    parts?: number[];
    descendants?: number;
}

/**
 * Interfaz que representa el ítem tal como lo almacenamos en nuestra DB (Supabase).
 * Coincide con la estructura de la tabla `hn_items`.
 */
export interface DBItemDTO {
    id: number;
    by: string;
    title: string;
    url: string | null;
    score: number;
    time: number;
    type: string;
    created_at?: Date; // Opcional, Supabase lo gestiona
}

/**
 * Interfaz para los parámetros de consulta (filtros y paginado).
 */
export interface QueryParamsDTO {
    page: number;
    limit: number;
    title?: string; // Búsqueda parcial en el título
    author?: string; // Búsqueda por autor ('by')
    sortField?: 'id' | 'title' | 'score' | 'time' | 'created_at';
    sortOrder?: 'asc' | 'desc';
}