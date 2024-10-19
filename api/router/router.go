package router

import (
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


    userRoutes.SetUpUserRoutes(api);
}