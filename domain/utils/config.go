package utils

import "time"

type DBConfig struct {
	Host     string
	Port     int
	User     string
	DB       string
	Password string
}

//#TODO: need to change
func GetDBConfig() DBConfig {
	return DBConfig{
		Host:     "127.0.0.1",
		Port:     5432,
		User:     "postgres",
		DB:       "postgres",
		Password: "123456"}
}

type Redis struct {
	Host        string
	Port        int
	Password    string
	MaxIdle     int
	MaxActive   int
	IdleTimeout time.Duration
}

func GetRedisConfig() Redis {
	return Redis{
		Host:        "127.0.0.1",
		Port:        6379,
		MaxIdle:     30,
		MaxActive:   30,
		IdleTimeout: 200,
		Password:    "",
	}
}
