package httpclient

import "github.com/gin-gonic/gin"

func auth(r *gin.RouterGroup) {
	r.GET("/auth")
}
