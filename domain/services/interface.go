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

type Consumer interface {
	GetConsumers() ([]models.Consumer, error)
	GetConsumerById(id int) (models.Consumer, error)
	GetConsumerByName(name string) (models.Consumer, error)
	GetConsumerExtension(id int) (models.ConsumerExtension, error)

	AddNewConsumer(consumer Consumer) error
	EditConsumer(consumer Consumer) error
	DeleteConsumer(id int) error
}
