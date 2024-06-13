package models

import (
	"encoding/json"
	"fmt"
	"gorm.io/gorm"
)

type Pojo interface {
	print()
	Create(data []byte) Pojo
}

type Patient struct {
	gorm.Model
	FullName   string `json:"fullName"`
	FatherName string `json:"fatherName"`
	AMKA       string `json:"AMKA"`
}

func (p Patient) print() {
	fmt.Println("Patient: ", p)
}

func (p Patient) Create(data []byte) Pojo {
	var patient Patient

	err := json.Unmarshal(data, &patient)
	if err != nil {
		panic(fmt.Sprintf("Could not create Patient %s", err))
	}

	return patient
}
