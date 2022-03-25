package models

import (
	"Hephaestus/database"

	"github.com/jinzhu/gorm"
)

var db *gorm.DB

func init() {
	connection := database.DBClient{}
	connection.ConnectPostgres()
	db = connection.Client
}
