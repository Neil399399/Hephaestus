package services

import "Hephaestus/models"

func GetToken(username string, password string) (string, error) {
	var auth models.Auth
	auth.Username = username
	auth.Password = password
	err := auth.GetToken()
	if err != nil {
		return "", err
	}
	return auth.Token, nil
}
