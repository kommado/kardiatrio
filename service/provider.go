package service

import (
	"context"
	"encoding/json"
	"fmt"
	"kardiatrio/models"
	"kardiatrio/providers"
	"log"
)

type ApiResponse struct {
	Data  []any `json:"data"`
	Total int64 `json:"total"`
}

type ApiResponseSingle struct {
	Data any `json:"data"`
}

type Query struct {
	Sort   []string               `json:"sort"`
	Range  []int                  `json:"range"`
	Filter map[string]interface{} `json:"filter"`
}

type GetOneRequestParams struct {
	BaseIdentifier
}

type GetListRequestParams struct {
	Query Query `json:"query"`
}

type GetManyRequestParams struct {
	ID []int `json:"ids"`
}

type PostRequestOnlyData struct {
	Body string `json:"body"`
}

type PostRequestParamsSingle struct {
	BaseIdentifier
	Body string `json:"body"`
}

type PostRequestParamsMulti struct {
	ID   []int  `json:"ids"`
	Body string `json:"body"`
}

type Identifier interface {
	getId() uint
}

type BaseIdentifier struct {
	ID string `json:"id"`
}

func (b BaseIdentifier) getId() uint {
	var result uint
	err := json.Unmarshal([]byte(b.ID), &result)
	if err != nil {
		panic(fmt.Sprintf("Failed to unmarshal %s to uint", b.ID))
	}
	return result
}

type IProviderService interface {
	GetList(resource string, params GetListRequestParams) ApiResponse
	GetOne(resource string, params GetOneRequestParams) ApiResponseSingle
	GetMany(resource string, params GetManyRequestParams) ApiResponse
	GetManyReference(resource string, params GetManyRequestParams) ApiResponse
	Create(resource string, params PostRequestOnlyData) ApiResponseSingle
	Update(resource string, params PostRequestParamsSingle) ApiResponseSingle
	UpdateMany(resource string, params PostRequestParamsMulti) ApiResponseSingle
	Delete(resource string, params GetOneRequestParams) ApiResponseSingle
	DeleteMany(resource string, params GetManyRequestParams) ApiResponseSingle
}

type ProviderService struct {
	ctx  context.Context
	data *providers.DataLayer
}

func (p ProviderService) GetList(resource string, params GetListRequestParams) ApiResponse {
	log.Println("service::GetList")
	log.Println("Resource:", resource)
	log.Println("Params: ", params)

	provider, err := p.data.GetProvider(resource)
	if err != nil {
		panic(err)
	}
	data, total := provider.List()
	return ApiResponse{Data: data, Total: total}

}

func (p ProviderService) GetOne(resource string, params GetOneRequestParams) ApiResponseSingle {
	fmt.Println("Resource:", resource)
	fmt.Println("Params: ", params)

	provider, err := p.data.GetProvider(resource)
	if err != nil {
		panic(err)
	}
	return ApiResponseSingle{
		Data: provider.GetById(params.getId()),
	}
}

func (p ProviderService) GetMany(resource string, params GetManyRequestParams) ApiResponse {
	fmt.Println("Resource:", resource)
	fmt.Println("Params: ", params)
	return ApiResponse{
		Data:  make([]any, 0),
		Total: 0,
	}
}

func (p ProviderService) GetManyReference(resource string, params GetManyRequestParams) ApiResponse {
	fmt.Println("Resource:", resource)
	fmt.Println("Params: ", params)
	return ApiResponse{
		Data:  make([]any, 0),
		Total: 0,
	}
}

func (p ProviderService) Create(resource string, params PostRequestOnlyData) ApiResponseSingle {
	fmt.Println("Resource:", resource)
	fmt.Println("Params: ", params)
	pojo := models.Patient{}
	return ApiResponseSingle{
		Data: pojo,
	}
}

func (p ProviderService) Update(resource string, params PostRequestParamsSingle) ApiResponseSingle {
	fmt.Println("Resource:", resource)
	fmt.Println("Params: ", params)

	provider, err := p.data.GetProvider(resource)
	if err != nil {
		panic(err)
	}
	return ApiResponseSingle{
		Data: provider.Update(params.getId(), params.Body),
	}
}

func (p ProviderService) UpdateMany(resource string, params PostRequestParamsMulti) ApiResponseSingle {
	fmt.Println("Resource:", resource)
	fmt.Println("Params: ", params)
	pojo := models.Patient{}
	return ApiResponseSingle{
		Data: pojo,
	}
}

func (p ProviderService) Delete(resource string, params GetOneRequestParams) ApiResponseSingle {
	fmt.Println("Resource:", resource)
	fmt.Println("Params: ", params)
	pojo := models.Patient{}
	return ApiResponseSingle{
		Data: pojo,
	}
}

func (p ProviderService) DeleteMany(resource string, params GetManyRequestParams) ApiResponseSingle {
	fmt.Println("Resource:", resource)
	fmt.Println("Params: ", params)
	pojo := models.Patient{}
	return ApiResponseSingle{
		Data: pojo,
	}

}

func (p ProviderService) Setup(ctx context.Context) {
	log.Println("Provider service setup")
	p.ctx = ctx
}

func NewProviderService() *ProviderService {
	return &ProviderService{
		data: providers.NewDataLayer(),
	}
}
