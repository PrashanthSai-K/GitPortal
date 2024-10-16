package main
import (
	"github.com/gin-gonic/gin"
	"net/http"
	"./database/database.go"
)

func main() {
	
	route := gin.Default()
	database.ConnectDatabase()
	route.GET("/ping", func(context *gin.Context) {
		 context.JSON(http.StatusOK, gin.H{
				"message": "pong",
		 })
	})

	err := route.Run(":8080")
	if err != nil {
		 panic(err)
	}

}