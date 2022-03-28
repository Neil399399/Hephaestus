package httpclient

import (
	"Hephaestus/gredis"
	"Hephaestus/utils"

	"net/http"
	"time"

	log "github.com/sirupsen/logrus"

	"github.com/gin-gonic/gin"
)

var TOKEN_EXPIRED_TIME = 30 * time.Minute

type Response struct {
	Code int         `json:"code"`
	Msg  string      `json:"msg"`
	Data interface{} `json:"data"`
}

func HttpRun() {
	//init
	router := gin.Default()
	// root
	router.GET("healthz", healthz)
	router.POST("/login", login)

	// api route
	apiv1 := router.Group("/api/v1")

	// apiv1.Use(JWT())
	auth(apiv1)

	router.Run(":8090")
}

func healthz(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"healthz": "ok",
		"time":    time.Now().GoString(),
	})
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
	// check redis, if exist, then return, else generate and save in redis
	exist := gredis.Exists(username)
	if exist {
		token, err := gredis.Get(username)
		if err != nil {
			log.Error(err)
			c.JSON(http.StatusInternalServerError, Response{
				Code: int(ERROR),
				Msg:  err.Error(),
			})
			return
		}
		c.JSON(http.StatusAccepted, Response{
			Code: success.code,
			Msg:  success.msg,
			Data: gin.H{"token": string(token)},
		})
		return
	} else {
		token, err := utils.GenerateToken(username, password)
		if err != nil {
			log.Error(err)
			c.JSON(http.StatusInternalServerError, Response{
				Code: int(ERROR),
				Msg:  err.Error(),
			})
			return
		}
		// set in redis
		err = gredis.Set(username, token, TOKEN_EXPIRED_TIME)
		if err != nil {
			log.Error(err)
			c.JSON(http.StatusInternalServerError, Response{
				Code: int(ERROR),
				Msg:  err.Error(),
			})
			return
		}
		c.JSON(http.StatusAccepted, Response{
			Code: success.code,
			Msg:  success.msg,
			Data: gin.H{"token": string(token)},
		})
		return
	}
}
