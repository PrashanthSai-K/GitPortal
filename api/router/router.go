package router

import (
	"fmt"

	userRoutes "github.com/PrashanthSai-K/GitPortal/api/src/routes/user"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func SetUpRouter(app *fiber.App ){

    api := app.Group("/api/v1/", logger.New());

	api.Get("/", func(c *fiber.Ctx) error {
		err := c.SendString(" Hiii from /api !!!")
		return err
	})

    api.Post("/webhook", func(c *fiber.Ctx) error {
		// Parse the JSON body from GitLab
		var payload map[string]interface{}
		if err := c.BodyParser(&payload); err != nil {
			return c.Status(400).SendString("Invalid request payload")
		}

		// Handle webhook event (you can process specific events here)
		eventType := c.Get("X-Gitlab-Event")
		fmt.Println("Received GitLab Event:", eventType)

		// Example: Process a push event
		if eventType == "Push Hook" {
			fmt.Println("Processing push event")
			// Do something when a push event happens (e.g., trigger tasks)
		}

        project := payload["project"].(map[string]interface{})
		lastCommit := payload["commits"].([]interface{})[0].(map[string]interface{})


        fmt.Printf("Project: %s\n", project["name"])
		fmt.Printf("Last Commit: %s by %s  %s\n", lastCommit["message"], lastCommit["author"].(map[string]interface{})["name"], lastCommit["timestamp"].(string))


		// Respond with a status 200 to acknowledge receipt
		return c.SendString("Webhook received successfully")
	}) 


    userRoutes.SetUpUserRoutes(api);
}