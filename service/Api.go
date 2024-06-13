package service

import (
	"encoding/json"
	"fmt"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"kardiatrio/models"
	"log"
	"net/http"
	"strconv"
	"strings"
)

type Crud interface {
	buildRoutes(e *gin.Engine)
	getItems(ctx *gin.Context)
	getItem(ctx *gin.Context)
	postIem(ctx *gin.Context)
	updateItem(ctx *gin.Context)
	deleteItem(ctx *gin.Context)
}

type Api struct {
	Providers []Crud
}

type BaseProvider struct {
	db           *gorm.DB
	providerName string
}

type ListQueryString struct {
	Filter string `form:"filter"`
	Range  string `form:"range"`
	Sort   string `form:"sort"`
}

func NewApi() *Api {
	conn := models.ConnectDatabase()
	return &Api{
		Providers: []Crud{
			newPatientProvider(conn),
		},
	}
}

func (a Api) Initialize() string {
	r := gin.Default()
	backendUrl := "http://127.0.0.1:8080"
	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{
			"GET",
			"POST",
			"PUT",
			"DELETE",
		},
		AllowHeaders:  []string{"Origin"},
		ExposeHeaders: []string{"X-Total-Count"},
	}))
	for _, p := range a.Providers {
		p.buildRoutes(r)
	}
	err := r.Run()
	if err != nil {
		panic("Failed")
	}
	return backendUrl
}

func (c BaseProvider) getItems(ctx *gin.Context) {
	log.Printf("%s/getItems()", c.providerName)
	log.Println("Connection: ", c.db)

	db := c.applySorting(ctx)

	var patients []map[string]interface{}
	result := db.Find(&patients)

	log.Println("Data: ", patients)
	log.Println("Total: ", result.RowsAffected)
	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": result.Error.Error(),
		})
		return
	}
	ctx.Header("X-Total-Count", strconv.FormatInt(result.RowsAffected, 10))
	ctx.JSON(http.StatusOK, patients)
}

func (c BaseProvider) getItem(ctx *gin.Context) {
	log.Println("getItem", ctx.Params)
}

func (c BaseProvider) postIem(ctx *gin.Context) {
	log.Println("postItem", ctx.Params)
}

func (c BaseProvider) updateItem(ctx *gin.Context) {
	log.Println("updateItem", ctx.Params)
}

func (c BaseProvider) deleteItem(ctx *gin.Context) {
	log.Println("deleteItem", ctx.Params)
}

func (c BaseProvider) applySorting(ctx *gin.Context) *gorm.DB {
	var query ListQueryString
	var sorting []string
	err := ctx.Bind(&query)
	log.Println("Query: ", query)
	if err != nil {
		log.Panicln("Could not bind ListQueryString")
		return c.db
	}

	err = json.Unmarshal([]byte(query.Sort), &sorting)
	if err != nil {
		log.Panicln("Could not convert ", query.Sort, " to json, ", err)
		return c.db
	}
	sorting[1] = strings.ToLower(sorting[1])
	log.Println("Sorting: ", strings.Join(sorting, " "))
	return c.db.Order(strings.Join(sorting, " "))
}

func (c BaseProvider) buildRoutes(engine *gin.Engine) {
	engine.GET(c.providerName, c.getItems)
	engine.GET(fmt.Sprintf("%s/:id", c.providerName), c.getItem)
	engine.POST(c.providerName, c.postIem)
	engine.PUT(fmt.Sprintf("%s/:id", c.providerName), c.updateItem)
	engine.DELETE(fmt.Sprintf("%s/:id", c.providerName), c.deleteItem)
}
