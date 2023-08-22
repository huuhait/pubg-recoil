package weapon

type Weapon struct {
	Name   string
	Muzzle Attachment
	Grip   Attachment
}

func NewWeapon(name string) *Weapon {
	return &Weapon{
		Name: name,
	}
}
