package projectRoutes

import (
	projectHandler "github.com/PrashanthSai-K/GitPortal/api/src/handlers/projects"
	"github.com/gofiber/fiber/v2"
)


func SetUpProjectRoutes(router fiber.Router){

	project := router.Group("/project");

	project.Get("/", projectHandler.GetProjects);

	project.Get("/:id/users", projectHandler.GetProjectUsers);

	project.Post("/", projectHandler.CreateProject);
}