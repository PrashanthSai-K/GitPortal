package userRoutes

import (
	userHandler "github.com/PrashanthSai-K/GitPortal/api/src/handlers/user"
	"github.com/gofiber/fiber/v2"
)

func SetUpUserRoutes(router fiber.Router) {

	user := router.Group("/user")

	user.Get("/", userHandler.GetAllUsers);

	user.Put("/", userHandler.UpdateUser);

}