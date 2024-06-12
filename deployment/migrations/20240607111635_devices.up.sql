CREATE TABLE IF NOT EXISTS devices(
   id serial PRIMARY KEY,
   consumer int NOT NULL,
   pc_num VARCHAR (50) NOT NULL,
   username VARCHAR (50),
   department VARCHAR (50),
   deviceId VARCHAR (50),
   state int NOT NULL,
   specification VARCHAR (300),
   OS int NOT NULL,
   lan_ip VARCHAR (50),
   wireless_ip VARCHAR (50),
   lan_mac VARCHAR (50),
   wireless_mac VARCHAR (50),
   create_at TIMESTAMPTZ NOT NULL
);