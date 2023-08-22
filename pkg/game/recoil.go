package game

import (
	"time"

	"github.com/huuhait/pubg-recoil/pkg/stats"
)

type Recoil struct {
	playerStats   *stats.PlayerStats
	count         int
	ms            int
	ostatokX      int
	ostatokXneg   int
	multiplyIdeal int
}

func NewRecoil(playerStats *stats.PlayerStats) *Recoil {
	return &Recoil{
		playerStats:   playerStats,
		multiplyIdeal: 12,
	}
}

func (r *Recoil) Start() {
	for {
		if r.playerStats.ReadyRecoil() {
			r.StartFire()
		} else {
			r.StopFire()
			time.Sleep(10 * time.Millisecond)
		}
	}
}

func (r *Recoil) StartFire() {

}

func (r *Recoil) StopFire() {
	r.count = 0
	r.ms = 0
	r.ostatokX = 0
	r.ostatokXneg = 0
}
