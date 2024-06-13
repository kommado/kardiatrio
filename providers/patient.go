package providers

import (
	"encoding/json"
	"gorm.io/gorm"
	"kardiatrio/models"
)

type PatientProvider struct {
	BaseDataProvider
}

func (p PatientProvider) Update(id uint, data string) any {
	var patient models.Patient
	json.Unmarshal([]byte(data), &patient)
	patient.ID = id
	p.conn.Save(&patient)
	return patient
}

func newPatientProvider(conn *gorm.DB) *PatientProvider {
	return &PatientProvider{
		BaseDataProvider{
			conn:         conn.Model(&models.Patient{}),
			providerName: "patients",
		},
	}
}
