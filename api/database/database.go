// database/database.go

package database

import (
    "database/sql"
    "fmt"
    "github.com/joho/godotenv"
    _ "github.com/lib/pq"
    "os"
    "strconv"
)

var Db *sql.DB 

// ConnectDatabase establishes a connection to the PostgreSQL database.
func ConnectDatabase() {
    err := godotenv.Load()
    if err != nil {
        fmt.Println("Error occurred loading .env file. Please check:", err)
        return
    }
    
    host := os.Getenv("HOST")
    port, err := strconv.Atoi(os.Getenv("PORT"))
    if err != nil {
        fmt.Println("Invalid port:", err)
        return
    }
    user := os.Getenv("USER")
    dbname := os.Getenv("DB_NAME")
    pass := os.Getenv("PASSWORD")

    psqlSetup := fmt.Sprintf("host=%s port=%d user=%s dbname=%s password=%s sslmode=disable",
        host, port, user, dbname, pass)
    
    db, errSql := sql.Open("postgres", psqlSetup)
    if errSql != nil {
        fmt.Println("There is an error while connecting to the database:", errSql)
        return
    } 
    Db = db
    fmt.Println("Successfully connected to database!")
}

// Students represents the student structure
type Students struct {
    ID        int    `json:"id"`
    Rollno    string `json:"rollno"`
    Name      string `json:"name"`
    Email     string `json:"email"`
    Year      int    `json:"year"`
    Department string `json:"department"`
    Dob       string `json:"dob"`
    Mobileno  string `json:"mobileno"`
    Bio       string `json:"bio"`
    Status    string `json:"status"`
}

// GetAllUsers retrieves all students from the database.
func GetAllUsers() ([]Students, error) {
    rows, err := Db.Query("SELECT id, rollno, name, email, year, department, dob, mobileno, bio, status FROM students")
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    var students []Students
    for rows.Next() {
        var student Students
        if err := rows.Scan(&student.ID, &student.Rollno, &student.Name, &student.Email, &student.Year, &student.Department, &student.Dob, &student.Mobileno, &student.Bio, &student.Status); err != nil {
            return nil, err
        }
        students = append(students, student)
    }

    if err := rows.Err(); err != nil {
        return nil, err
    }

    return students, nil
}
