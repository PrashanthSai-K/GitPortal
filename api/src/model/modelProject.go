package model

import (
	"time"
)

type Project struct {
	ID              int    `json:"id"`
	ProjectName     string `json:"project_name"`
	ProjectId       int    `json:"project_id"`
	ProjectLink     string `json:"project_link"`
	Description     string `json:"description"`
	OwnerId         int    `json:"owner_id"`
	OwnerName       string `json:"owner_name"`
	OwnerEmail      string `json:"owner_email"`
	OwnerDepartment string `json:"owner_department"`
	Status          string `json:"status"`
	CreatedAt       string `json:"created_at"`
	LastCommitDate  string `json:"last_commit_date"`
}

type ProjectUsers struct {
	ID                int    `json:"id"`
	ProjectId         int    `json:"project_id"`
	StudentId         int    `json:"student_id"`
	StudentName       string `json:"student_name"`
	StudentRollno     string `ison:"student_rollno"`
	StudentEmail      string `json:"student_email"`
	StudentYear       int    `json:"student_year"`
	StudentDepartment string `json:"student_department"`
	StudentStatus     string `json:"student_status"`
	StudentRole       string `json:"student_role"`
}

type ProjectCreate struct {
	ID                 int    `json:"id"`
	ProjectName        string `json:"project_name"`
	ProjectDescription string `json:"project_description"`
	ProjectLead        User   `json:"project_lead"`
	MultipleUsers      bool   `json:"multiple_users"`
	OwnerId            int    `json:"owner_id"`
	AssignedUsers      []User `json:"assigned_users"`
}

type ProjectInsert struct {
	ID             int       `json:"id"`
	ProjectName    string    `json:"project_name"`
	ProjectId      int       `json:"project_id"`
	ProjectLink    string    `json:"project_link"`
	OwnerId        int       `json:"owner_id"`
	Status         string    `json:"status"`
	LastCommitDate string    `json:"last_commit_date"`
	Description    string    `json:"description"`
	CreatedAt      time.Time `json:"created_at"`
	UpdatedAt      time.Time `json:"updated_at"`
}

func (ProjectInsert) TableName() string {
	return "projects"
}

type ProjectAssignment struct {
	ID        int    `json:"id"`
	ProjectId int    `json:"project_id"`
	StudentId int    `json:"student_id"`
	Role      string `json:"role"`
}

func (ProjectAssignment) TableName() string {
	return "project_assignment"
}
