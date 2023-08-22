package game

import (
	"fmt"
	"math"
	"strconv"
	"time"

	"github.com/huuhait/pubg-recoil/pkg/mouse"
	"github.com/huuhait/pubg-recoil/pkg/stats"
	"github.com/huuhait/pubg-recoil/pkg/weapon"
)

type Recoil struct {
	playerStats   *stats.PlayerStats
	count         int
	ms            int
	ostatokX      float64
	ostatokXneg   float64
	multiplyIdeal float64
	factor        float64
	procMouse     mouse.ProcMouse
}

func NewRecoil(playerStats *stats.PlayerStats) *Recoil {
	return &Recoil{
		playerStats:   playerStats,
		multiplyIdeal: 12,
		factor:        1.2055 * math.Pow(1.048, 50-1),
		procMouse:     mouse.Mouse(),
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

func (r *Recoil) GetIndex(weapon *weapon.Weapon) float64 {
	var cIndex float64
	var cDelay int
	offset := weapon.GetOffset()
	for delay, index := range offset.DelayIndexes {
		if r.ms >= delay && delay >= cDelay {
			cIndex = index
			cDelay = delay
		}
	}

	return cIndex
}

func (r *Recoil) StartFire() {
	weapon, _ := r.playerStats.GetActiveWeapon()
	var x float64
	pos := 0
	offset := weapon.GetOffset()

	currentIndex := r.GetIndex(weapon)

	if r.ostatokX >= 1 {
		pos = 1
	} else if r.ostatokXneg <= 1 {
		pos = -1
	}

	scopeFactor := 1.0 // Update soon

	x = (currentIndex*r.multiplyIdeal/r.factor)*scopeFactor/weapon.GetGripFactor()/weapon.GetMuzzleFactor()/r.playerStats.GetStandFactor() + float64(pos)
	r.ms += offset.Interval

	if r.ostatokX >= 1 {
		r.ostatokX -= 1
	} else if r.ostatokXneg <= 1 {
		r.ostatokXneg += 1
	}

	if float64(int(x)) != x {
		intX := int(x)
		nf, _ := strconv.ParseFloat(fmt.Sprintf("0.%d", intX), 64)
		if x > 0 {
			r.ostatokX += nf
		} else {
			r.ostatokXneg -= nf
		}
	}

	r.procMouse.Move(0, float32(int(x)))
	time.Sleep(time.Duration(offset.Interval) * time.Millisecond)
}

func (r *Recoil) StopFire() {
	r.count = 0
	r.ms = 0
	r.ostatokX = 0
	r.ostatokXneg = 0
}
