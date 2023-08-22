package weapon

type Weapon struct {
	Name   string
	Muzzle Muzzle
	Grip   Grip
}

func NewWeapon(name string) *Weapon {
	return &Weapon{
		Name: name,
	}
}

func (w *Weapon) GetOffset() RecoilOffset {
	return RecoilOffsets[w.Name]
}

func (w *Weapon) GetMuzzleFactor() float64 {
	factor, found := MuzzleFactor[w.Muzzle]
	if !found {
		return 1
	}

	return factor
}

func (w *Weapon) GetGripFactor() float64 {
	factor, found := GripFactor[w.Grip]
	if !found {
		return 1
	}

	return factor
}
