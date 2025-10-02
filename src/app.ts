// src/app.ts (Modificado)

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes/index'; // Importar las rutas

const app = express();

// Middlewares
app.use(cors()); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

// Rutas de la API (prefijo /api)
app.use('/api', router); // <--- AÑADIDO

// Ruta base para verificar que el API está corriendo
app.get('/', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        message: 'Tech Test API is running. Check /api routes.' 
    });
});

// Middleware básico para manejar rutas no encontradas (404)
app.use((req, res, next) => {
    res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

export default app;