package httpclient

import (
	"github.com/gin-gonic/gin"
)

func HttpRun() {
	router := gin.Default()
	router.GET("healthz")
	apiv1 := router.Group("/api/v1")
	auth(apiv1)
	router.Run(":80")
}
