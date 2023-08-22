package screen_coords

import "image"

var FirstGun = image.Rect(1760, 115, 2420, 375)
var SecondGun = image.Rect(1760, 388, 2420, 648)

var Attachments = map[string]image.Rectangle{
	"Muzzle": image.Rect(12, 187, 78, 253),
	"Grip":   image.Rect(148, 187, 215, 253),
	"Sight":  image.Rect(375, 38, 442, 99),
}

var WeaponName = image.Rect(62, 10, 300, 55)
var Inventory = image.Rect(489, 70, 666, 124)
var Bullets = image.Rect(1250, 1315, 1308, 1365)
var Stand = image.Rect(930, 1299, 995, 1370)
