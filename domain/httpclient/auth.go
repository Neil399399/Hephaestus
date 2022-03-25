package httpclient

import (
	"Hephaestus/models"
	"encoding/json"
	"net/http"

	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

func auth(r *gin.RouterGroup) {
	r.POST("/user", getUser)
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
