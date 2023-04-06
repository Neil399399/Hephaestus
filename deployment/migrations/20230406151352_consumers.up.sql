CREATE TABLE IF NOT EXISTS consumers(
   id serial PRIMARY KEY,
   name VARCHAR (50) UNIQUE NOT NULL,
   address VARCHAR (300) NOT NULL,
   tel VARCHAR (300) UNIQUE NOT NULL,
   ip_address VARCHAR (50) NOT NULL,
   extension JSONB,
   create_at TIMESTAMPTZ NOT NULL
);
