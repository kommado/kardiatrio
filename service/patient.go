package service

import (
	"gorm.io/gorm"
	"kardiatrio/models"
)

type PatientProvider struct {
	BaseProvider
}

func newPatientProvider(conn *gorm.DB) *PatientProvider {
	return &PatientProvider{
		BaseProvider{
			db:           conn.Model(&models.Patient{}),
			providerName: "/patients",
		},
	}
}

//func (p PatientProvider) buildRoutes(engine *gin.Engine) {
//	return
//}
