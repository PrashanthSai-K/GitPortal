package router

import (
	"database/sql"
)

var Db *sql.DB


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

func GetAllUsers() ([]User, error) {
	rows, err := Db.Query("SELECT id, rollno, name, email, year, department, dob, mobileno, bio, status FROM users")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var users []User
	for rows.Next() {
		var user User
		if err := rows.Scan(&user.ID, &user.RollNo, &user.Name, &user.Email, &user.Year, &user.Department, &user.Dob, &user.Mobileno, &user.Bio, &user.Status); err != nil {
			return nil, err
		}
		users = append(users, user)
	}
	return users, nil
}
