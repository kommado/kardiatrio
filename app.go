package main

import (
	"context"
	"github.com/wailsapp/wails/v2/pkg/menu"
	"github.com/wailsapp/wails/v2/pkg/menu/keys"
	"github.com/wailsapp/wails/v2/pkg/runtime"
	"log"
	"os"
)

// App struct
type App struct {
	ctx        context.Context
	backendUrl string
	setup      *Setup
}

type Profile struct {
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Email     string `json:"email"`
	Password  string `json:"password"`
}

type Setup struct {
	profile *Profile
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	a.setup = newSetup()

	//api := service.NewApi()
	//a.backendUrl = api.Initialize()
	//serviceProvider := newProviderService()
	//serviceProvider.providers = map[string]IProvider{
	//	"patients": service.NewPatientProvider(models.ConnectDatabase()),
	//}
}

func (a *App) BackendURL() string {
	return a.backendUrl
}

func (a *App) applicationMenu() *menu.Menu {
	AppMenu := menu.NewMenu()
	FileMenu := AppMenu.AddSubmenu("File")
	//FileMenu.AddText("&Open", keys.CmdOrCtrl("o"), openFile)
	FileMenu.AddSeparator()
	FileMenu.AddText("Quit", keys.CmdOrCtrl("q"), func(_ *menu.CallbackData) {
		runtime.Quit(a.ctx)
	})
	return AppMenu
}

func (a *App) IsSetup() bool {
	return false
}

func (a *App) EmptyProfile() *Profile {
	return &Profile{}
}

func newSetup() *Setup {
	log.Println(os.Getwd())
	return &Setup{}
}

func (a *App) SubmitProfile(profile *Profile) {
	log.Println(profile)
	a.setup.profile = profile
}
