package gui

import (
	"fmt"

	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/app"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/widget"
	"github.com/huuhait/pubg-recoil/pkg/stats"
	"github.com/huuhait/pubg-recoil/pkg/weapon"
)

type GUI struct {
	window              fyne.Window
	weaponLabels        []*widget.Label
	selectedWeaponLabel *widget.Label
	standStateLabel     *widget.Label
}

func NewGUI() *GUI {
	a := app.New()
	w := a.NewWindow("Hello")

	firstWeaponLabel := widget.NewLabel("- Empty")
	secondWeaponLabel := widget.NewLabel("- Empty")
	selectedWeaponLabel := widget.NewLabel("Selected Weapon: EMPTY")
	standStateLabel := widget.NewLabel("Stand State: stand")
	w.SetContent(container.NewVBox(
		widget.NewLabel("Weapon slot:"),
		firstWeaponLabel,
		secondWeaponLabel,
		widget.NewAccordion(),
		selectedWeaponLabel,
		standStateLabel,
	))

	w.Resize(fyne.Size{
		Width:  350,
		Height: 80,
	})
	w.SetFixedSize(true)

	return &GUI{
		window:              w,
		weaponLabels:        []*widget.Label{firstWeaponLabel, secondWeaponLabel},
		selectedWeaponLabel: selectedWeaponLabel,
		standStateLabel:     standStateLabel,
	}
}

func (g *GUI) ShowAndRun() {
	g.window.ShowAndRun()
}

func (g *GUI) SetWeapons(weapons []*weapon.Weapon) {
	for i, label := range g.weaponLabels {
		if len(weapons) >= i+1 {
			w := weapons[i]
			label.SetText(fmt.Sprintf("- Name: %s Muzzle: %s, Grip: %s", w.Name, w.Muzzle, w.Grip))
		} else {
			label.SetText("- Empty")
		}
	}
}

func (g *GUI) SetActiveWeapon(weapon *weapon.Weapon) {
	if weapon == nil {
		g.selectedWeaponLabel.SetText("Selected Weapon: EMPTY")
	} else {
		g.selectedWeaponLabel.SetText(fmt.Sprintf("Selected Weapon: %s", weapon.Name))
	}
}

func (g *GUI) SetStandState(state stats.StandState) {
	g.standStateLabel.SetText(fmt.Sprintf("Stand State: %s", state))
}
