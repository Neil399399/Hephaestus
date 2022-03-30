package utils

import (
	"time"

	"github.com/dgrijalva/jwt-go"
)

var jwtSecret = "hephaestus"

type Claims struct {
	Username string `json:"username"`
	jwt.StandardClaims
}

// GenerateToken generate tokens used for auth
func GenerateToken(userId, username string, expireTime int64) (string, error) {
	now := time.Now()
	claims := Claims{
		username,
		jwt.StandardClaims{
			Audience:  userId,
			ExpiresAt: expireTime,
			Issuer:    "hephaestus",
			IssuedAt:  now.Unix(),
			Subject:   username,
		},
	}

	tokenClaims := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	token, err := tokenClaims.SignedString([]byte(jwtSecret))

	return token, err
}

// ParseToken parsing token
func ParseToken(token string) (*Claims, error) {
	tokenClaims, err := jwt.ParseWithClaims(token, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		return jwtSecret, nil
	})

	if tokenClaims != nil {
		if claims, ok := tokenClaims.Claims.(*Claims); ok && tokenClaims.Valid {
			return claims, nil
		}
	}

	return nil, err
}
