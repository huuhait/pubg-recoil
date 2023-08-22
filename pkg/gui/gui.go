package gui

import (
	"github.com/huuhait/pubg-recoil/pkg/stats"
	"github.com/huuhait/pubg-recoil/pkg/weapon"
)

type GUI struct{}

func NewGUI() *GUI {
	// a := app.New()
	// w := a.NewWindow("Hello")

	// hello := widget.NewLabel("Hello Fyne!")
	// w.SetContent(container.NewVBox(
	// 	hello,
	// 	widget.NewButton("Hi!", func() {
	// 		hello.SetText("Welcome :)")
	// 	}),
	// ))

	// w.ShowAndRun()
	return &GUI{}
}

func (g *GUI) SetWeapons(weapons []*weapon.Weapon) {}

func (g *GUI) SetActiveWeapon(weapon weapon.Weapon) {}

func (g *GUI) SetStandState(state stats.StandState) {}
