// src/routes/index.ts

import { Router } from 'express';
import { dataController } from '../controllers/DataController';

const router = Router();

/**
 * RUTA 1: POST /api/external-data
 * Extraer data de API externa y almacenar en DB.
 */
router.post('/external-data', dataController.postExternalData);

/**
 * RUTA 2: GET /api/data
 * Obtener data con filtros (title, author) y paginado.
 * Query Params: ?page=1&limit=10&title=ia&sortField=score&sortOrder=desc
 */
router.get('/data', dataController.getData);

/**
 * RUTA 3: GET /api/export-csv
 * Generar y descargar CSV de la data.
 */
router.get('/export-csv', dataController.exportCsv);


export default router;