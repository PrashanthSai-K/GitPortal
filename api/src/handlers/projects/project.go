package projectHandler

import (
	"fmt"
	"strconv"

	"github.com/PrashanthSai-K/GitPortal/api/database"
	"github.com/PrashanthSai-K/GitPortal/api/src/model"
	"github.com/gofiber/fiber/v2"
)

func GetProjects(c *fiber.Ctx) error {

	var projects []model.Project

	db := database.DB

	result := db.Raw("SELECT * FROM project_view ORDER BY created_at DESC").Scan(&projects)

	if result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to fetch projects",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"data": projects})

}

func GetProjectUsers(c *fiber.Ctx) error {

	var projectUsers []model.ProjectUsers

	id, err := strconv.ParseInt(c.Params("id"), 10, 64)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to fetch projects",
		})
	}

	db := database.DB

	result := db.Raw("SELECT * FROM project_users_view WHERE project_id = ?", id).Scan(&projectUsers)

	if result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to fetch projects",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"data": projectUsers})

}

func CreateProject(c *fiber.Ctx) error {

	var project model.ProjectCreate

	err := c.BodyParser(&project)

	if err != nil {
		fmt.Println(err.Error())
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Enter valid project details"})
	}

	if project.ProjectName == "" || project.ProjectDescription == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Project name and description are required"})
	}

	if project.ProjectLead == (model.User{}) {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Project Lead required"})
	}

	if project.MultipleUsers && len(project.AssignedUsers) <= 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Team Members required"})
	}


	db := database.DB

	tx := db.Begin()

	var projectInsert model.ProjectInsert

	projectInsert.ProjectName = project.ProjectName
	projectInsert.Description = project.ProjectDescription
	projectInsert.OwnerId = 1
	projectInsert.Status = "PENDING"

	result := tx.Create(&projectInsert)

	if result.Error!= nil {
        tx.Rollback()
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to create project"})
    }

	var projectAssignment model.ProjectAssignment

	projectAssignment.ProjectId = projectInsert.ID
	projectAssignment.StudentId = project.ProjectLead.ID
	projectAssignment.Role = "MAINTAINER"
	projectAssignment.ID = 0

	result = tx.Create(&projectAssignment)

	if result.Error!= nil {
        tx.Rollback()
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to create project"})
    }

    if !project.MultipleUsers {
		tx.Commit()
		return c.Status(fiber.StatusAccepted).JSON(fiber.Map{"message": "Project successfully created"})
	}

	for _, user := range project.AssignedUsers {
		projectAssignment.StudentId = user.ID
		projectAssignment.Role = "DEVELOPER"
		projectAssignment.ID = 0

        result = tx.Create(&projectAssignment)

        if result.Error!= nil {
            tx.Rollback()
            return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to create project"})
        }
    }

	tx.Commit()

	return c.Status(fiber.StatusAccepted).JSON(fiber.Map{"message": "Project successfully created"})
}
