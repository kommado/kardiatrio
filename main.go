package main

import (
	"context"
	"embed"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"kardiatrio/service"
	"log"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// Create an instance of the app structure
	app := NewApp()
	providerService := service.NewProviderService()
	log.Println("Starting application")

	// Create application with options
	err := wails.Run(&options.App{
		Title:  "kardiatrio",
		Width:  1600,
		Height: 1200,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		//Menu:             app.applicationMenu(),
		OnStartup: func(ctx context.Context) {
			app.startup(ctx)
			//providerService.Setup(ctx)
		},
		Bind: []interface{}{
			app,
			providerService,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
