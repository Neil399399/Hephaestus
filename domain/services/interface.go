package services

import (
	"Hephaestus/models"
)

type User interface {
	GetUser(username string, password string) (models.User, error)
}
