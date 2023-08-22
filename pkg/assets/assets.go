package assets

import "github.com/huuhait/pubg-recoil/pkg/weapon"

var MuzzleAssets = map[weapon.Muzzle][]string{
	weapon.MuzzleCompensator: {
		"assets/attachments/compensator/1.jpg",
		"assets/attachments/compensator/2.jpg",
		"assets/attachments/compensator/3.jpg",
		"assets/attachments/compensator/4.jpg",
		"assets/attachments/compensator/5.jpg",
	},
}

var GripAssets = map[weapon.Grip][]string{
	weapon.VerticalGrip: {
		"assets/attachments/vertical/1.jpg",
		"assets/attachments/vertical/2.jpg",
		"assets/attachments/vertical/3.jpg",
	},
}
