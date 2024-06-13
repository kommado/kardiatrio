package providers

import (
	"errors"
	"fmt"
	"gorm.io/gorm"
	"kardiatrio/models"
	"log"
)

type DataProvider interface {
	List() ([]any, int64)
	GetById(id uint) any
	Update(id uint, data string) any

	getName() string
}

type BaseDataProvider struct {
	conn         *gorm.DB
	providerName string
}

func (b BaseDataProvider) GetById(id uint) any {
	log.Println(fmt.Sprintf("%s::GetById", b.providerName))
	log.Println("Connection: ", b.conn)
	var row map[string]interface{}
	b.conn.First(&row, id)
	log.Println("Data: ", row)

	return row
}

func toAnyList(rows []map[string]interface{}) []any {
	var result []any
	for _, row := range rows {
		log.Println("Row: ", row)
		result = append(result, row)
	}
	return result
}

func (b BaseDataProvider) getName() string {
	return b.providerName
}

func (b BaseDataProvider) List() ([]any, int64) {
	log.Println(fmt.Sprintf("%s::List()", b.providerName))
	log.Println("Connection: ", b.conn)
	var rows []map[string]interface{}
	result := b.conn.Find(&rows)

	log.Println("Data: ", rows)
	log.Println("Total: ", result.RowsAffected)

	return toAnyList(rows), result.RowsAffected
}

type DataLayer struct {
	providers []DataProvider
}

func (d DataLayer) GetProvider(resource string) (DataProvider, error) {
	for _, dp := range d.providers {
		if dp.getName() == resource {
			return dp, nil
		}
	}
	return nil, errors.New(fmt.Sprintf("Data provider %s not found", resource))
}

func NewDataLayer() *DataLayer {
	conn := models.ConnectDatabase()
	return &DataLayer{
		providers: []DataProvider{
			newPatientProvider(conn),
		},
	}
}
