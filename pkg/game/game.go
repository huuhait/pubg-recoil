package game

import (
	"image"
	"time"

	"github.com/huuhait/pubg-recoil/pkg/gui"
	"github.com/huuhait/pubg-recoil/pkg/stats"
	"github.com/huuhait/pubg-recoil/pkg/utils"
	"github.com/zsmartex/pkg/v2/log"

	hook "github.com/robotn/gohook"
)

type Game struct {
	GUI         *gui.GUI
	recoil      *Recoil
	playerStats *stats.PlayerStats
	scanning    bool
}

func NewGame(GUI *gui.GUI) *Game {
	playerStats := stats.NewPlayerStats()

	return &Game{
		playerStats: playerStats,
		recoil:      NewRecoil(playerStats),
		GUI:         GUI,
	}
}

func (g *Game) ScanStandState() {
	for {
		if !g.scanning && g.playerStats.ReadyRecoil() {
			state, err := g.getStandState()
			if err != nil {
				log.Errorf("failed to scan stand state: %v", err)
				continue
			}

			g.playerStats.SetStandState(state)
			g.GUI.SetStandState(state)
		}
		time.Sleep(50 * time.Millisecond)
	}
}

func (g *Game) ScanBullets() {
	for {
		_, found := g.playerStats.GetActiveWeapon()

		if !g.scanning && g.playerStats.Hold().Fire && g.playerStats.Hold().Aim && found {
			availableBullets, err := g.isBulletsAvailable()
			if err != nil {
				log.Errorf("failed to scan bullets: %v", err)
				continue
			}

			g.playerStats.SetAvailableBullets(availableBullets)
		}
		time.Sleep(50 * time.Millisecond)
	}
}

func (g *Game) ScanInventory() {
	for {
		if !g.scanning {
			time.Sleep(20 * time.Millisecond)
			continue
		}

		screenshot, err := utils.Screenshot(image.Rect(0, 0, 2560, 1440))
		if err != nil {
			log.Errorf("failed to screenshot while scanning: %v", err)
			time.Sleep(500 * time.Millisecond)
			continue
		}

		isInventoryOpening, err := g.isInventoryOpening(screenshot)
		if err != nil {
			log.Errorf("failed to scan inventory: %v", err)
			time.Sleep(500 * time.Millisecond)
			continue
		}

		if !isInventoryOpening {
			g.scanning = false
			continue
		}

		weapons, err := g.getWeapons(screenshot)
		if err != nil {
			log.Errorf("failed to scan weapons: %v", err)
			time.Sleep(500 * time.Millisecond)
			continue
		}

		g.playerStats.SetWeapons(weapons)
		g.GUI.SetWeapons(weapons)
		currentActiveWeapon, found := g.playerStats.GetActiveWeapon()
		if found {
			g.GUI.SetActiveWeapon(currentActiveWeapon)
		}

		time.Sleep(20 * time.Millisecond)
	}
}

func (g *Game) DeviceHook() {
	hook.Register(hook.KeyDown, []string{"tab"}, func(e hook.Event) {
		g.scanning = true
	})

	hook.Register(hook.KeyDown, []string{"1"}, func(e hook.Event) {
		g.playerStats.SetActiveWeapon(1)
		currentActiveWeapon, _ := g.playerStats.GetActiveWeapon()
		g.GUI.SetActiveWeapon(currentActiveWeapon)
	})

	hook.Register(hook.KeyDown, []string{"2"}, func(e hook.Event) {
		g.playerStats.SetActiveWeapon(2)
		currentActiveWeapon, _ := g.playerStats.GetActiveWeapon()
		g.GUI.SetActiveWeapon(currentActiveWeapon)
	})

	hook.Register(hook.MouseHold, []string{}, func(e hook.Event) {
		if e.Button == hook.MouseMap["right"] {
			g.playerStats.SetAim(true)
		} else if e.Button == hook.MouseMap["left"] {
			g.playerStats.SetFire(true)
		}
	})

	hook.Register(hook.MouseUp, []string{}, func(e hook.Event) {
		if e.Button == hook.MouseMap["right"] {
			g.playerStats.SetAim(false)
		} else if e.Button == hook.MouseMap["left"] {
			g.playerStats.SetFire(false)
		}
	})

	hook.Register(hook.MouseDown, []string{}, func(e hook.Event) {
		if e.Button == hook.MouseMap["right"] {
			g.playerStats.SetAim(false)
		} else if e.Button == hook.MouseMap["left"] {
			g.playerStats.SetFire(false)
		}
	})

	s := hook.Start()
	<-hook.Process(s)
}

func (g *Game) Start() {
	go g.ScanInventory()
	go g.ScanBullets()
	go g.ScanStandState()
	go g.recoil.Start()
	go g.DeviceHook()
}
