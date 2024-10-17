// router/router.go

package router

import "github.com/gin-gonic/gin"

// InitRouter initializes the Gin router.
func InitRouter() *gin.Engine {
    return gin.Default()
}
