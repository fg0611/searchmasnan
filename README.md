# 🚀 Prueba Técnica: API Node.js, Express, Supabase & IA

Solución de prueba técnica implementada con un enfoque en la arquitectura modular (Servicios, Repositorios, Controladores) utilizando **Node.js, TypeScript, Express** y **Supabase** como base de datos.

---

## 🛠️ Stack Tecnológico

| Componente | Tecnología | Propósito |
| :--- | :--- | :--- |
| **Backend Framework** | Express.js | Core del servidor HTTP. |
| **Lenguaje** | TypeScript | Tipado estático para código robusto y mantenible. |
| **Base de Datos** | Supabase (PostgreSQL) | Persistencia de datos, elegido por su agilidad (Postgres + API REST integrada). |
| **API Externa** | Hacker News API | Fuente de datos (noticias y leads de tecnología/IA), elegida por su simplicidad (sin Auth). |
| **Utilidades** | Axios, json2csv | Peticiones HTTP y generación de archivos CSV. |
| **Entorno Local** | Docker | Contenedorización para garantizar la portabilidad y el entorno de ejecución. |

---

## 🏃 Cómo Correr el Proyecto de Forma Local

### 1. Requisitos

* Docker y Docker Compose (opcional, pero recomendado).
* Node.js/npm (si no usas Docker para la ejecución).
* Un proyecto en **Supabase** con las credenciales de API.

### 2. Configuración de Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto y complétalo con tus credenciales de Supabase:

```dotenv
# Puerto de la API
PORT=3000

# Supabase Configuration (Reemplazar con tus credenciales)
SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY

# External API Configuration
HN_BASE_URL=[https://hacker-news.firebaseio.com/v0](https://hacker-news.firebaseio.com/v0)
HN_TOP_STORIES_ENDPOINT=/topstories.json
HN_ITEM_ENDPOINT=/item