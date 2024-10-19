// main.go

package main

import (
	"fmt"

	"github.com/PrashanthSai-K/GitPortal/api/database"
	"github.com/PrashanthSai-K/GitPortal/api/router"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {



	app := fiber.New();
	app.Use(cors.New());

	// Connect to the database
	database.ConnectDatabase()

	fmt.Println("Connecting to database")

	router.SetUpRouter(app)

	app.Listen(":4500")

}
