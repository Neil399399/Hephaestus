package postgres

import (
	"Hephaestus/models"
)

func (m *DBClient) GetUser(username string, password string) (models.User, error) {
	var user models.User
	result := m.client.Where("username = ?", username).Table("users").Find(&user)
	if result.Error != nil {
		return user, result.Error
	}
	return user, nil
}
