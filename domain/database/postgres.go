package database

import (
	"fmt"

	"Hephaestus/utils"

	"github.com/jinzhu/gorm"
	_ "github.com/lib/pq"
	log "github.com/sirupsen/logrus"
)

type DBClient struct {
	Client *gorm.DB
}

func (m *DBClient) ConnectPostgres() {
	config := utils.GetDBConfig()
	client, err := gorm.Open(
		"postgres",
		fmt.Sprintf(
			"host=%s port=%d user=%s dbname=%s password=%s sslmode=disable",
			config.Host,
			config.Port,
			config.User,
			config.DB,
			config.Password,
		),
	)
	if err != nil {
		log.Panic(err)
	}
	m.Client = client
	log.Info("connected")
}

func (m *DBClient) Disconnect() {
	m.Client.Close()
}
