package database

import (
	"fmt"

	"Hephaestus/utils"

	_ "github.com/lib/pq"
	log "github.com/sirupsen/logrus"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type DBClient struct {
	Client *gorm.DB
}

func (m *DBClient) ConnectPostgres() {
	config := utils.GetDBConfig()
	dsn := fmt.Sprintf(
		"host=%s port=%d user=%s dbname=%s password=%s sslmode=disable",
		config.Host,
		config.Port,
		config.User,
		config.DB,
		config.Password,
	)

	client, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Panic(err)
	}
	m.Client = client
	log.Info("connected")
}