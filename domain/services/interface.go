package services

import (
	"Hephaestus/models"
)

type Auth interface {
	GetToken(username string, password string) ([]byte, error)
}

type User interface {
	GetUser(username string, password string) (models.User, error)
}
