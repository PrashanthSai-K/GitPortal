package projectHandler

import (
	"fmt"
	"github.com/PrashanthSai-K/GitPortal/api/src/model"
	"gorm.io/gorm"
)

func CreateProjectDB(tx *gorm.DB, project model.ProjectCreate) *gorm.DB {

	result1 := tx.Raw("INSERT INTO projects (project_name, owner_id, status, description ) VALUES (?, ?, ?, ?) RETURNING id",
		project.ProjectName, 1, "PENDING", project.ProjectDescription).Scan(&project.ID)

	if result1.Error != nil {
		return result1
	}

	fmt.Println(result1.RowsAffected, "   ", project.ID)

	fmt.Println(project.ID, project.ProjectLead.ID)

	result2 := tx.Raw("INSERT INTO project_assignment (project_id, student_id, role) VALUES (?, ?, ?)",
		project.ID, project.ProjectLead.ID, "MAINTAINER",)
	
	if result2.Error != nil {
		fmt.Println(result2.Error)
		return result1
	}

	if !project.MultipleUsers{
		return nil
	}

    for _, user := range project.AssignedUsers {
		fmt.Println(project.ID, user)
		result3 := tx.Raw("INSERT INTO project_assignment (project_id, student_id, role) VALUES (?, ?, ?)",
            project.ID, user.ID, "DEVELOPER")

        if result3.Error != nil {
			return result3
		}
	}

	return nil
}


// func ProjectAssignmentStruct () model.ProjectAssignment {

// }