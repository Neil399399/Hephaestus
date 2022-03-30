package models

import (
	"Hephaestus/gredis"
	"Hephaestus/utils"
	"encoding/json"
	"time"
)

var TOKEN_EXPIRED_TIME = 30 * time.Minute

type Auth struct {
	Id       string
	Username string
	Password string
	Token    string
}

func (a *Auth) GetToken() error {
	exist := gredis.Exists(a.Username)
	var token string
	if exist {
		tokenB, err := gredis.Get(a.Username)
		if err != nil {
			return err
		}

		err = json.Unmarshal(tokenB, &token)
		if err != nil {
			return err
		}
		a.Token = token
		return nil
	} else {
		expiredTime := time.Now().Add(TOKEN_EXPIRED_TIME).Unix()
		token, err := utils.GenerateToken(a.Id, a.Username, expiredTime)
		if err != nil {
			return err
		}
		// set in redis
		err = gredis.Set(a.Username, token, expiredTime)
		if err != nil {
			return err
		}
		a.Token = token
		return nil
	}
}
