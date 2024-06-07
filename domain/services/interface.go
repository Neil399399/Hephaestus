package services

import (
	"Hephaestus/models"
)

type Auth interface {
	GetToken(username string, password string) ([]byte, error)
}

type User interface {
	GetUser(username string, password string) (models.User, error)
	AddUser(user User) error
}

type Consumer interface {
	GetConsumers() ([]models.Consumer, error)
	GetConsumerById(id int) (models.Consumer, error)
	GetConsumerByName(name string) (models.Consumer, error)
	GetConsumerExtension(id int) (models.ConsumerExtension, error)

	AddNewConsumer() error
	EditConsumer() error
	DeleteConsumer(id int) error
}

type Devices interface {
	GetDevice(id int64) (models.Device, error)
	GetDevicesByConsumerID(cId int64) ([]models.Device, error)

	AddDevice() error
	UpdateDevice() error
	DelDevice(id int64) error
}
