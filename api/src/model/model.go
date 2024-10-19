package model

import (
	// "gorm.io/gorm"
)

type User struct {
	ID        int    `json:"id"`
	RollNo    string `json:"rollno"`
	Name      string `json:"name"`
	Email     string `json:"email"`
	Year      int    `json:"year"`
	Department string `json:"department"`
	Dob       string `json:"dob"`
	Mobileno  string `json:"mobileno"`
	Bio       string `json:"bio"`
	Status    string `json:"status"`
}


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

