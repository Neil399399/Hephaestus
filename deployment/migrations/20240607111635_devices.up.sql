CREATE TABLE IF NOT EXISTS devices(
   id serial PRIMARY KEY,
   consumer int NOT NULL,
   user VARCHAR (50),
   deviceId VARCHAR (50) NOT NULL,
   state int NOT NULL,
   specification VARCHAR (300),
   OS int NOT NULL,
   ip VARCHAR (50),
   mac VARCHAR (50),
   create_at TIMESTAMPTZ NOT NULL
);