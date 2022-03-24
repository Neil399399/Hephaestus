package utils

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
