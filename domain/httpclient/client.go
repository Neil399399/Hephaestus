package httpclient

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

func HttpRun() {
	router := gin.Default()
	// root
	router.GET("healthz", healthz)

	// api route
	apiv1 := router.Group("/api/v1")
	apiv1.Use(JWT())
	auth(apiv1)

	router.Run(":8090")
}

func healthz(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"healthz": "ok",
		"time":    time.Now().GoString(),
	})
}
