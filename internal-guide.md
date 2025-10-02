Entiendo, ese es un error común al configurar proyectos modernos de Node.js con TypeScript, especialmente cuando se usa la sintaxis de **módulos ES (import/export)**.

El error `TS5109` te está indicando que hay una inconsistencia en la forma en que TypeScript está intentando resolver las dependencias (`moduleResolution`) y el formato de módulo que estás generando (`module`).

Para solucionar este problema de forma ágil y moderna, debes ajustar el archivo de configuración de TypeScript, `tsconfig.json`.

-----

## Solución al Error `TS5109`

Para resolver `error TS5109: Option 'moduleResolution' must be set to 'NodeNext' (or left unspecified) when option 'module' is set to 'NodeNext'`, sigue estos pasos:

### 1\. Asegura la Configuración de Módulos

Debes configurar **tanto** `module` como `moduleResolution` para que usen el estándar moderno de Node.js.

Abre tu archivo **`tsconfig.json`** y asegúrate de que estas dos opciones estén configuradas de la siguiente manera, probablemente en la sección `"compilerOptions"`:

```json
{
  "compilerOptions": {
    // ... otras opciones ...

    // 1. Especifica que la salida debe ser compatible con los módulos modernos de Node.js
    "module": "NodeNext", 

    // 2. Especifica que la forma de buscar e importar módulos debe ser la de Node.js
    "moduleResolution": "NodeNext", 

    // 3. (OPCIONAL, pero recomendado) Asegúrate que el target sea moderno
    "target": "es2020", 

    // ... otras opciones ...
  }
}
```

### 2\. Actualiza el Tipo de Proyecto en `package.json`

Si estás usando `import/export` en tus archivos (`.ts`), Node.js (y TypeScript) espera que tu proyecto sea de tipo módulo.

Abre tu archivo **`package.json`** y añade la clave `"type"` en el nivel superior:

```json
{
  "name": "tech-test-api",
  // ... otras claves ...
  
  // Agrega o verifica esta línea
  "type": "module", 

  "scripts": {
    // ... scripts ...
  },
  // ... dependencias ...
}
```

Al hacer estos dos cambios, le indicas a TypeScript:

1.  **Módulos (`module: "NodeNext"`):** "Quiero que el código compilado use la sintaxis moderna de `import` y `export` de Node.js."
2.  **Resolución (`moduleResolution: "NodeNext"`):** "Cuando busques una librería o archivo importado, usa la lógica que Node.js emplea para resolver módulos ES."

Estos ajustes deberían eliminar el error `TS5109` y permitirte compilar y ejecutar el proyecto con `ts-node-dev` o después de la compilación con `tsc`.

-----

## 📄 `README.md` (Documentación Requerida)

Ahora que hemos terminado la funcionalidad y resuelto un error de configuración clave, vamos a generar el archivo **`README.md`** tal como lo solicitó el cliente.

### **README.md**

````markdown
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
````

### 3\. Configuración de la Base de Datos (Supabase)

Asegúrate de haber ejecutado el siguiente SQL para crear la tabla `hn_items`:

```sql
CREATE TABLE hn_items (
    id BIGINT PRIMARY KEY,
    by TEXT,
    title TEXT NOT NULL,
    url TEXT,
    score INT,
    time BIGINT,
    type TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 4\. Ejecución (Opción Recomendada: Docker)

Utiliza los scripts definidos en `package.json`:

```bash
# 1. Construye la imagen Docker
npm run docker:build 

# 2. Ejecuta el contenedor (la API estará en http://localhost:3000)
npm run docker:run 
```

### 4\. Ejecución (Opción Local con ts-node)

```bash
# Instala dependencias
npm install 

# Ejecuta en modo desarrollo (watch mode)
npm run dev 
```

-----

## 🌐 Endpoints Expuestos

| Método | Ruta | Descripción |
| :--- | :--- | :--- |
| **POST** | `/api/external-data` | Extrae las top 50 historias de Hacker News y las almacena/actualiza en la base de datos de Supabase. |
| **GET** | `/api/data` | Devuelve los datos almacenados. Permite filtros, ordenamiento y paginado. |
| **GET** | `/api/export-csv` | Genera y descarga un archivo CSV con todos los datos de la base. |

### Ejemplo de Consulta (`/api/data`)

`GET /api/data?page=2&limit=5&title=ai&sortField=score&sortOrder=desc`

  * **Filtros:** `title` (búsqueda parcial *case-insensitive*), `author` (búsqueda exacta).
  * **Paginado:** `page`, `limit`.
  * **Ordenamiento:** `sortField` (`id`, `title`, `score`, `time`, `created_at`), `sortOrder` (`asc`, `desc`).

-----

## 📐 Decisiones de Diseño y Arquitectura

1.  **Arquitectura por Capas (Services/Repository/Controller):**
      * **Controladores (`controllers`):** Solo manejan la Request (req, res), validan *inputs* y delegan la lógica. Son "delgados".
      * **Servicios (`services`):** Contienen la lógica de negocio (ej. `ExternalDataService` orquestra las peticiones a la API externa).
      * **Repositorios (`DataRepository`):** Encapsulan la lógica de acceso a datos (interacción con Supabase), permitiendo cambiar la DB sin alterar los servicios.
2.  **Uso de DTOs (Data Transfer Objects):** Se usaron interfaces TypeScript (`Item.dto.ts`) para tipar estrictamente los datos que entran, salen y se almacenan, mejorando la seguridad y la claridad del código.
3.  **Supabase para Agilidad:** Se eligió Supabase para evitar la configuración manual de *drivers* y ORMs, permitiendo un desarrollo mucho más rápido y enfocándonos en la lógica del negocio.
4.  **Peticiones Paralelas:** En el `ExternalDataService`, se utilizó `Promise.allSettled` para obtener los detalles de las historias de Hacker News en paralelo, minimizando drásticamente el tiempo de ejecución del `POST /api/external-data`.

-----

## 🤖 Uso Consciente y Justificado de la Inteligencia Artificial (IA)

La IA fue un acelerador clave para cumplir con el requisito de tiempo estipulado (1-2 horas), enfocando el tiempo del desarrollador en la lógica de negocio compleja y la arquitectura.

| Área de Uso de IA | ¿Cómo se usó la IA? | Decisión Humana vs. IA |
| :--- | :--- | :--- |
| **Generación de Boilerplate** | Generación inicial de archivos como `package.json`, `Dockerfile`, y el *snippet* de configuración de `tsconfig.json` para **NodeNext**. | La IA generó el código, pero la **decisión arquitectónica** (elegir Docker, NodeNext, TypeScript) fue del desarrollador. |
| **Utilidades (CSV)** | Generación de la función auxiliar `generateCsv` usando la librería `json2csv` y la configuración de *headers*. | La IA aceleró la implementación de una tarea estándar. La **decisión de usar esa librería y definir los *fields*** (columnas del CSV) fue del desarrollador. |
| **Manejo de Errores** | Sugerencias de *snippets* de *middleware* y formatos de respuesta de error (`res.status(500).json(...)`) para buenas prácticas HTTP. | La IA sugirió el formato, pero el desarrollador **justificó el uso del código y lo integró** en el `DataController`. |
| **Documentación** | Estructuración y formato de las secciones del `README.md` (tablas, negritas, emojis) para una comunicación clara y profesional. | La IA ayudó con el formato. El **contenido técnico (ej. Decisiones de Diseño)** fue dictado por el desarrollador. |
| **Autocompletado en IDE** | Uso de IA tipo Copilot para sugerencias de código mientras se escribía la sintaxis de Supabase (`.from().select().eq().order()`). | Aceleración en la escritura de sintaxis, permitiendo **enfocarse en la lógica de la *query* (qué filtrar y ordenar)** en lugar de recordar la API exacta. |

```
```