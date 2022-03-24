package database

import (
	"Hephaestus/models"
)

type Auth interface {
	GetUser(username string, password string) (models.Auth, error)
}
