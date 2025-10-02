// src/server.ts

import app from './app';
import * as dotenv from 'dotenv';

dotenv.config();

// El puerto del .env o 3000 por defecto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Open http://localhost:${PORT} in your browser to check status.`);
});