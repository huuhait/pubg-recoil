package stats

import (
	"github.com/huuhait/pubg-recoil/pkg/weapon"
)

type StandState string

var (
	StandStateStand = StandState("stand")
	StandStateSit   = StandState("sit")
	StandStateLie   = StandState("lie")
)

type PlayerStatsHold struct {
	Aim  bool
	Fire bool
}

type PlayerStats struct {
	weapons          []*weapon.Weapon
	hold             PlayerStatsHold
	standState       StandState
	activeWeaponSlot int
	sensitive        int
	availableBullets bool
}

func NewPlayerStats() *PlayerStats {
	return &PlayerStats{
		weapons:    make([]*weapon.Weapon, 0),
		hold:       PlayerStatsHold{},
		standState: StandStateStand,
		sensitive:  50,
	}
}

func (p *PlayerStats) SetAim(aim bool) {
	p.hold.Aim = aim
}

func (p *PlayerStats) SetFire(fire bool) {
	p.hold.Fire = fire
}

func (p *PlayerStats) SetWeapons(weapons []*weapon.Weapon) {
	p.weapons = weapons
}

func (p *PlayerStats) SetActiveWeapon(slot int) {
	if len(p.weapons) < slot {
		return
	}

	p.activeWeaponSlot = slot
}

func (p *PlayerStats) GetActiveWeapon() (weapon *weapon.Weapon, found bool) {
	if p.activeWeaponSlot == 0 {
		return nil, false
	}

	if len(p.weapons) == 0 {
		return nil, false
	}

	if len(p.weapons) < p.activeWeaponSlot {
		return nil, false
	}

	activeWeapon := p.weapons[p.activeWeaponSlot-1]

	return activeWeapon, true
}

func (p *PlayerStats) Hold() PlayerStatsHold {
	return p.hold
}

func (p *PlayerStats) ReadyRecoil() bool {
	_, found := p.GetActiveWeapon()

	return p.hold.Aim && p.hold.Fire && found && p.IsAvailableBullets()
}

func (p *PlayerStats) GetStandFactor() float64 {
	if p.standState == StandStateStand {
		return 1
	} else if p.standState == StandStateSit {
		return 1.3
	} else {
		return 1.8
	}
}

func (p *PlayerStats) GetStandState() StandState {
	return p.standState
}

func (p *PlayerStats) SetStandState(state StandState) {
	p.standState = state
}

func (p *PlayerStats) IsAvailableBullets() bool {
	return p.availableBullets
}

func (p *PlayerStats) SetAvailableBullets(available bool) {
	p.availableBullets = available
}
