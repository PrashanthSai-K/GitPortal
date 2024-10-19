// database/database.go

package database

import (
	"fmt"
	"github.com/PrashanthSai-K/GitPortal/api/config"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

// ConnectDatabase establishes a connection to the PostgreSQL database.
func ConnectDatabase() {

	host := config.Config("DB_HOST")
	port := config.Config("DB_PORT")
	user := config.Config("DB_USER")
	dbname := config.Config("DB_NAME")
	pass := config.Config("DB_PASSWORD")

	psqlSetup := fmt.Sprintf("host=%s port=%s user=%s dbname=%s password=%s sslmode=disable",
		host, port, user, dbname, pass)

	db, err := gorm.Open(postgres.Open(psqlSetup), &gorm.Config{})
	if err != nil {
		fmt.Println("There is an error while connecting to the database:", err)
		return
	}

	DB = db
	fmt.Println("Successfully connected to database!");

}
