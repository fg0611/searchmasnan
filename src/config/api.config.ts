// src/config/api.config.ts

import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const HN_BASE_URL = process.env.HN_BASE_URL;

if (!HN_BASE_URL) {
    console.error("FATAL ERROR: HN_BASE_URL not set in environment variables.");
    throw new Error("Hacker News Base URL missing.");
}

// Cliente Axios preconfigurado para la API de Hacker News
export const hackerNewsApi = axios.create({
    baseURL: HN_BASE_URL,
    timeout: 10000, // Timeout de 10 segundos
    headers: {
        'Content-Type': 'application/json',
    },
});

console.log(`Hacker News API Client initialized. Base URL: ${HN_BASE_URL}`);