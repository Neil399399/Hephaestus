package models

import (
	"Hephaestus/database"

	"gorm.io/gorm"
)

var db *gorm.DB

func init() {
	connection := database.DBClient{}
	connection.ConnectPostgres()
	db = connection.Client
}
