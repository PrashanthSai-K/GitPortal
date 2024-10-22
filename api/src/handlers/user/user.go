package userHandler

import (
	"fmt"
	"strconv"

	"github.com/PrashanthSai-K/GitPortal/api/database"
	"github.com/PrashanthSai-K/GitPortal/api/src/model"
	"github.com/gofiber/fiber/v2"
)

func GetAllUsers(c *fiber.Ctx) error {
	var students []model.Students

	DB := database.DB

	result := DB.Raw("SELECT id, rollno, name, email, year, department, dob, mobileno, bio, status FROM students").Scan(&students)

	if result.Error != nil { // Properly check for error here
		fmt.Println("Error executing query:", result.Error)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to fetch students",
		})
	}

	for _, student := range students {
		fmt.Println(&student.ID, &student.Rollno, &student.Name, &student.Email, &student.Year, &student.Department, &student.Dob, &student.Mobileno, &student.Bio, &student.Status)
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"students": students})
}

func UpdateUser(c *fiber.Ctx) error {

	var student model.Students

	err := c.BodyParser(&student)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request body"})
	}

	DB := database.DB

	result := DB.Exec("UPDATE students SET name = ?, rollno = ?, department = ?, year = ?, email = ?  WHERE id = ?",
		student.Name, student.Rollno, student.Department, strconv.Itoa(student.Year), student.Email, student.ID)

	if result.Error != nil {
		fmt.Println("Error executing query:", result.Error)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to update student",
		})
	}

	return c.Status(fiber.StatusAccepted).JSON(fiber.Map{"message": "successfully updated"})
}
