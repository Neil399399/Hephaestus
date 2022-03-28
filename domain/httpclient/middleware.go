package httpclient

import (
	"net/http"

	"Hephaestus/utils"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

// JWT is jwt middleware
func JWT() gin.HandlerFunc {
	return func(c *gin.Context) {
		var code ErrCode
		var data interface{}

		code = SUCCESS
		token := c.Query("token")
		if token == "" {
			code = INVALID_PARAMS
		} else {
			_, err := utils.ParseToken(token)
			if err != nil {
				switch err.(*jwt.ValidationError).Errors {
				case jwt.ValidationErrorExpired:
					code = TOKEN_EXPIRED
				default:
					code = INVALID_TOKEN
				}
			}
		}

		if code != SUCCESS {
			err := GetError(code)
			c.JSON(http.StatusUnauthorized, Response{
				Code: err.code,
				Msg:  err.msg,
				Data: data,
			})
			c.Abort()
			return
		}
		c.Next()
	}
}
