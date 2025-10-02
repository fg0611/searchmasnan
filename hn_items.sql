-- CREATE TABLE hn_items (
--     id BIGINT PRIMARY KEY, -- Usamos el ID de la historia de Hacker News como clave primaria
--     by TEXT,              -- Autor
--     title TEXT NOT NULL,  -- Título de la historia
--     url TEXT,             -- URL del contenido
--     score INT,            -- Puntuación
--     time BIGINT,          -- Timestamp UNIX de creación
--     type TEXT,            -- Tipo de ítem (story, comment, etc.)
--     created_at TIMESTAMPTZ DEFAULT NOW() -- Timestamp de almacenamiento en nuestra DB
-- );

-- -- Opcional: Crear un índice para búsquedas rápidas por título
-- CREATE INDEX idx_hn_items_title ON hn_items (title);

-- select * from hn_items;