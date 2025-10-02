// src/config/supabase.config.ts

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

// Obtener las credenciales del .env
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  // En un entorno real, esto debería manejar un error de forma más robusta
  console.error("FATAL ERROR: Supabase credentials not found in environment variables.");
  // Throwing an error will prevent the app from starting without credentials
  // This is a good practice for essential configs.
  throw new Error("Supabase credentials missing.");
}

// Inicializar el cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log("Supabase Client initialized successfully.");