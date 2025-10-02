// src/services/ExternalDataService.ts

import { hackerNewsApi } from '../config/api.config';
import { HackerNewsItemDTO } from '../dtos/Item.dto';
import * as dotenv from 'dotenv';

dotenv.config();

// Endpoints (usados del .env)
const TOP_STORIES = process.env.HN_TOP_STORIES_ENDPOINT;
const ITEM_ENDPOINT = process.env.HN_ITEM_ENDPOINT;

export class ExternalDataService {

    /**
     * Obtiene los IDs de las historias más populares.
     */
    private async getTopStoryIds(): Promise<number[]> {
        if (!TOP_STORIES) {
            throw new Error("HN_TOP_STORIES_ENDPOINT not configured.");
        }
        const response = await hackerNewsApi.get<number[]>(TOP_STORIES);
        // Limitamos a 50 historias para evitar que la operación tome demasiado tiempo
        // y por agilidad del test.
        return response.data.slice(0, 50); 
    }

    /**
     * Obtiene los detalles completos de una historia por su ID.
     */
    private async getItemDetails(id: number): Promise<HackerNewsItemDTO> {
        if (!ITEM_ENDPOINT) {
            throw new Error("HN_ITEM_ENDPOINT not configured.");
        }
        const response = await hackerNewsApi.get<HackerNewsItemDTO>(`${ITEM_ENDPOINT}/${id}.json`);
        return response.data;
    }

    /**
     * Orquestador: Obtiene las top stories y sus detalles.
     */
    public async fetchAndProcessTopStories(): Promise<HackerNewsItemDTO[]> {
        console.log('Fetching top story IDs...');
        const storyIds = await this.getTopStoryIds();
        console.log(`Found ${storyIds.length} IDs. Fetching details...`);

        // Usamos Promise.all para hacer las peticiones en paralelo (mucho más rápido)
        const detailsPromises = storyIds.map(id => this.getItemDetails(id));
        
        const results = await Promise.allSettled(detailsPromises);

        const successfulStories: HackerNewsItemDTO[] = [];

        // Filtramos solo las promesas cumplidas que son de tipo 'story' y no tienen título nulo
        results.forEach(result => {
            if (result.status === 'fulfilled' && result.value && result.value.type === 'story' && result.value.title) {
                successfulStories.push(result.value);
            }
        });

        console.log(`Successfully retrieved details for ${successfulStories.length} stories.`);
        return successfulStories;
    }
}

export const externalDataService = new ExternalDataService();