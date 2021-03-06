package httpclient

import (
	"Hephaestus/models"
	"Hephaestus/services"

	"encoding/json"
	"net/http"

	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

//#TODO: this need to set in config
var cookie_max_age = 0
var cookie_domain = "localhost"
var cookie_secure = false // true: only support https
var cookie_http_only = false

func auth(r *gin.RouterGroup) {
	r.POST("/user", getUser)
}

func login(c *gin.Context) {
	// get params from body
	username, password, ok := c.Request.BasicAuth()
	if !ok {
		errCode := errors[INVALID_PARAMS]
		c.JSON(http.StatusBadRequest, Response{
			Code: errCode.code,
			Msg:  errCode.msg,
		})
		return
	}

	// GetToken
	token, err := services.GetToken(username, password)
	if !ok {
		errCode := errors[ERROR]
		c.JSON(http.StatusInternalServerError, Response{
			Code: errCode.code,
			Msg:  err.Error(),
		})
		return
	} else {
		c.SetCookie("hep_cookie", token, cookie_max_age, "/", cookie_domain, cookie_secure, cookie_http_only)
		c.JSON(http.StatusOK, Response{
			Code: success.code,
			Msg:  success.msg,
			Data: token,
		})
		return
	}
}

//#TODO: error handle
func getUser(c *gin.Context) {
	var user models.User

	jsonData, err := c.GetRawData()
	if err != nil {
		log.Error(err)
	}
	err = json.Unmarshal(jsonData, &user)
	if err != nil {
		log.Error(err)
	}

	err = user.GetUser()
	if err != nil {
		log.Error(err)
	}

	c.JSON(http.StatusOK, user)
}
