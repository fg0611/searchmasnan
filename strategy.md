# Prueba Técnica - Node.js, Express, Docker/Serverless + IA

## Descripción
Esta prueba técnica tiene como objetivo evaluar tu capacidad para desarrollar una API en **Node.js**, conectarla a una base de datos, consumir información de una **API externa**, y exponer endpoints útiles.  
Además, se evaluará tu criterio para documentar el proyecto, tu forma de organizar la solución y el **uso consciente de Inteligencia Artificial (IA)** en el proceso.

Podés implementar la solución:
- **Offline/local**, utilizando Docker o tu entorno habitual.  
- **En la nube**, utilizando AWS u otro proveedor con enfoque Serverless.  

La elección de herramientas, estructura de proyecto y librerías queda a tu criterio.

---

## Requerimientos de la API

La aplicación debe exponer los siguientes endpoints:

1. **POST `/api/external-data`**
   - Consume datos desde una API externa de libre elección.
   - Almacena esos datos en una base de datos.

2. **GET `/api/data`**
   - Devuelve los datos almacenados en la base.
   - Podés agregar filtros, estadísticas u otra funcionalidad que consideres valiosa.

3. **GET `/api/export-csv`**
   - Genera un archivo CSV con los datos de la base.
   - El archivo debe poder descargarse.

---

## Documentación requerida

Debés incluir un archivo `README.md` en el que expliques:

- Cómo correr el proyecto de forma local.  
- Opciones de deploy que decidiste implementar (Docker, Serverless, etc.).  
- Dependencias principales del proyecto.  
- Decisiones de diseño o arquitectura que hayas tomado.  
- Dónde y cómo usaste **IA** durante el desarrollo (ejemplo: generación de boilerplate, documentación, testing, snippets en el IDE, etc.).

---

## Consideraciones de IA

El uso de IA es parte de la evaluación. Queremos que indiques:

- En qué partes del proyecto recurriste a IA.  
- Qué decisiones fueron tuyas y cuáles aceleraste con la ayuda de IA.  
- Si usaste IA en el IDE (autocompletado, sugerencias de código), también explícalo.  

---

## Evaluación

Se tendrá en cuenta:

- Correcto funcionamiento de los endpoints.  
- Claridad y organización del código.  
- Documentación completa en el `README.md`.  
- Capacidad para ejecutar el proyecto localmente y/o desplegarlo en la nube.  
- Uso **consciente y justificado** de IA en el proceso.  

---

## Duración máxima

La prueba está pensada para completarse en **1 a 2 horas**.  
No buscamos una solución perfecta, sino evaluar tu **forma de trabajo, criterio técnico y capacidad para comunicar el proceso**.
