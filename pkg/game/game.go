package game

import (
	"image"
	"time"

	"github.com/huuhait/pubg-recoil/pkg/gui"
	"github.com/huuhait/pubg-recoil/pkg/stats"
	"github.com/huuhait/pubg-recoil/pkg/utils"
	"github.com/zsmartex/pkg/v2/log"
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

		time.Sleep(20 * time.Millisecond)
	}
}

func (g *Game) Start() {
	go g.ScanInventory()
	go g.ScanBullets()
	go g.ScanStandState()
	go g.recoil.Start()

	for {
		time.Sleep(1 * time.Second)
	}
}
