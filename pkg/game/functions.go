package game

import (
	"image"
	"strings"

	"github.com/huuhait/pubg-recoil/pkg/screen_coords"
	"github.com/huuhait/pubg-recoil/pkg/stats"
	"github.com/huuhait/pubg-recoil/pkg/utils"
	"github.com/huuhait/pubg-recoil/pkg/weapon"
)

func (*Game) getStandState() (stats.StandState, error) {
	img, err := utils.Screenshot(screen_coords.Stand)
	if err != nil {
		return stats.StandStateStand, err
	}

	standColor := utils.GetPixel(img, 38, 12)
	r, g, b, _ := standColor.RGBA()
	if r > 200 && g > 200 && b > 200 {
		return stats.StandStateStand, nil
	}
	lieColor := utils.GetPixel(img, 13, 49)
	r, g, b, _ = lieColor.RGBA()
	if r > 200 && g > 200 && b > 200 {
		return stats.StandStateLie, nil
	}

	return stats.StandStateSit, nil
}

func (g *Game) isInventoryOpening(screenshot image.Image) (bool, error) {
	_, err := utils.CropImage(screenshot, screen_coords.Inventory)
	if err != nil {
		return false, err
	}

	return false, nil
}

func (*Game) isBulletsAvailable() (bool, error) {
	img, err := utils.Screenshot(screen_coords.Bullets)
	if err != nil {
		return false, err
	}

	r, _, _, _ := utils.GetPixel(img, 23, 23).RGBA()
	return r != 255, nil
}

func (g *Game) getWeapon(img image.Image) (*weapon.Weapon, error) {
	var name string
	text, err := utils.GetTextFromImage(img)
	if err != nil {
		return nil, err
	}

	text = strings.ToLower(text)
	if strings.HasPrefix(text, "ak") {
		name = "AKM"
	} else if strings.HasPrefix(text, "m4") {
		name = "M416"
	} else if strings.HasPrefix(text, "beryl") {
		name = "Beryl"
	} else if strings.HasPrefix(text, "ace") {
		name = "ACE32"
	} else if strings.HasPrefix(text, "qb") {
		name = "QBZ"
	} else if strings.HasPrefix(text, "g3") {
		name = "G36C"
	} else if strings.HasPrefix(text, "vec") {
		name = "Vector"
	} else if strings.HasPrefix(text, "p9") {
		name = "P90"
	} else if strings.HasPrefix(text, "gro") {
		name = "Groza"
	}

	if len(name) == 0 {
		return nil, nil
	}

	weapon := weapon.NewWeapon(name)

	return weapon, nil
}

func (g *Game) getWeapons(screenshot image.Image) ([]*weapon.Weapon, error) {

	return make([]*weapon.Weapon, 0), nil
}
