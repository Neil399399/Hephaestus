package services

import "Hephaestus/models"

func GetUser(username string, password string) (models.User, error) {
	user := models.User{}
	user.Username = username
	user.Password = password
	return user.GetUser()
}
