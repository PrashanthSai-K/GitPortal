// main.go

package main

import (
	  "fmt"
    "net/http"
    "github.com/gin-gonic/gin"
    "github.com/PrashanthSai-K/GitPortal/api/database"
    "github.com/PrashanthSai-K/GitPortal/api/router"
)

func main() {
    // Connect to the database
    database.ConnectDatabase()

    // Initialize router
    r := router.InitRouter()

    // GET method to retrieve all users
    r.GET("/users", getUsers)

    // Run the server
    err := r.Run(":8080")
    if err != nil {
        panic(err)
    }
}

// Handler function for GET /users
func getUsers(c *gin.Context) {
    users, err := database.GetAllUsers()
    if err != nil {
        // Log the error for debugging
        fmt.Println("Error retrieving users:", err)

        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve users"})
        return
    }

    c.JSON(http.StatusOK, users)
}
