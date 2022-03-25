CREATE TABLE IF NOT EXISTS users(
   id serial PRIMARY KEY,
   username VARCHAR (50) UNIQUE NOT NULL,
   password VARCHAR (50) NOT NULL,
   email VARCHAR (300) UNIQUE NOT NULL,
   create_at TIMESTAMPTZ NOT NULL
);

INSERT INTO "users" ("username", "password", "email", "create_at")
VALUES ('test', '12345', 'test@test.com', '2019-09-26 02:41:39');