
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

* Docker y Docker Compose.
* Node.js/npm.
* Un proyecto en **Supabase** con las credenciales de API.

### 2. Configuración de Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto y complétalo con tus credenciales. **Esta configuración es crucial para la ejecución local con Docker.**

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
````

### 3\. Ejecución con Docker (Recomendado)

Utiliza los comandos de la CLI de Docker, asegurándote de inyectar las variables de entorno:

```bash
# 1. Construye la imagen (sin caché)
docker build --no-cache -t tech-test-api .

# 2. Ejecuta el contenedor, inyectando los secretos desde el archivo .env local
# Esto es necesario ya que el .env no se copia a la imagen por seguridad.
docker run -p 3000:3000 --env-file ./.env tech-test-api
```

-----

## 💾 Estructura de la Base de Datos (Supabase/PostgreSQL)

La API interactúa con una única tabla, **`hn_items`**, la cual debe ser creada en tu proyecto de Supabase para la persistencia de datos.

### Script SQL (`hn_items`)

```sql
CREATE TABLE hn_items (
    id BIGINT PRIMARY KEY,              -- ID único de la historia de Hacker News (clave primaria)
    by TEXT,                            -- Autor del ítem
    title TEXT NOT NULL,                -- Título de la historia
    url TEXT,                           -- URL del contenido externo
    score INT,                          -- Puntuación (votos)
    time BIGINT,                        -- Timestamp UNIX de la creación original en HN
    type TEXT,                          -- Tipo de ítem (e.g., 'story')
    created_at TIMESTAMPTZ DEFAULT NOW() -- Timestamp de cuándo se almacenó en nuestra DB
);
```

| Columna | Tipo | Descripción | Uso en la API |
| :--- | :--- | :--- | :--- |
| **`id`** | `BIGINT` | **Clave Primaria**. | Para realizar operaciones `UPSERT`. |
| `by` | `TEXT` | Autor del post. | Filtro por `author`. |
| `title` | `TEXT` | Título del artículo. | Filtro parcial por `title`. |
| `score` | `INT` | Puntuación del artículo. | Ordenamiento por `score`. |
| `created_at`| `TIMESTAMPTZ` | Momento del almacenamiento. | Ordenamiento por defecto. |

-----

## 🌐 Endpoints Expuestos

| Método | Ruta | Propósito |
| :--- | :--- | :--- |
| **POST** | `/api/external-data` | Extrae las top 50 historias de Hacker News y las almacena/actualiza en la DB. |
| **GET** | `/api/data` | Devuelve los datos almacenados con filtros (`title`, `author`), paginado y ordenamiento. |
| **GET** | `/api/export-csv` | Genera y permite la descarga de un archivo CSV con todos los datos. |

### Acceso al Deploy Público (Render)

Si el servicio está desplegado en Render (ej. `https://searchmasnan.onrender.com`), las rutas son:

  * **POST (Poblar):** `https://searchmasnan.onrender.com/api/external-data`
  * **GET (Consultar):** `https://searchmasnan.onrender.com/api/data?page=1&limit=10&title=ia`
  * **GET (CSV):** `https://searchmasnan.onrender.com/api/export-csv`

-----

## 📐 Decisiones de Diseño y Arquitectura

1.  **Arquitectura por Capas (Services/Repository/Controller):**
      * **Controladores:** Manejan la Request (req, res), validan *inputs* y delegan la lógica.
      * **Servicios:** Contienen la lógica de negocio (ej. Orquestar la extracción de datos).
      * **Repositorios:** Encapsulan la lógica de acceso a datos (interacción con Supabase), permitiendo la fácil migración de DB.
2.  **Peticiones Paralelas:** Se utilizó `Promise.allSettled` en el servicio de datos externos para obtener los detalles de las 50 historias concurrentemente, minimizando el tiempo de espera del *endpoint* `POST /api/external-data`.

-----

## 🤖 Uso Consciente y Justificado de la Inteligencia Artificial (IA)

La IA fue empleada como un acelerador para cumplir con los requisitos de la prueba y enfocarse en la arquitectura y lógica de negocio.

| Área de Uso de IA | ¿Cómo se usó la IA? | Decisión Humana vs. IA |
| :--- | :--- | :--- |
| **Configuración de Entorno** | Generación de *snippets* de `tsconfig.json` para la configuración **NodeNext** y comandos de Docker con inyección de variables (`--env-file`). | El desarrollador resolvió los errores de *runtime* (TS5109, ERR\_UNKNOWN\_FILE\_EXTENSION) y usó la IA para generar el código de configuración que aplicó la solución. |
| **Utilidades** | Generación de la función `generateCsv` usando la librería `json2csv`. | La IA aceleró la implementación de una tarea estándar. El desarrollador definió los *fields* del CSV. |
| **Plataformas** | Justificación del uso de Render sobre Vercel y generación de la guía de despliegue. | La IA proporcionó la justificación técnica, pero la **elección final** de la plataforma fue del desarrollador. |
| **Documentación** | Estructuración y formato de todo el `README.md`, incluyendo la generación del JSON de Postman y la tabla de estructura DB. | La IA ayudó con el formato. El **contenido técnico (SQL, rutas, filtros)** fue provisto por el desarrollador. |
