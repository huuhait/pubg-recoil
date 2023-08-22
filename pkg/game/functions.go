package game

import (
	"image"
	"strings"

	"github.com/huuhait/pubg-recoil/pkg/assets"
	"github.com/huuhait/pubg-recoil/pkg/screen_coords"
	"github.com/huuhait/pubg-recoil/pkg/stats"
	"github.com/huuhait/pubg-recoil/pkg/utils"
	"github.com/huuhait/pubg-recoil/pkg/weapon"
	"gocv.io/x/gocv"
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
	img, err := utils.CropImage(screenshot, screen_coords.Inventory)
	if err != nil {
		return false, err
	}

	result, err := utils.GetTextFromImage(img)
	if err != nil {
		return false, err
	}

	return result == "INVENTORY", nil
}

func (*Game) isBulletsAvailable() (bool, error) {
	img, err := utils.Screenshot(screen_coords.Bullets)
	if err != nil {
		return false, err
	}

	r, _, _, _ := utils.GetPixel(img, 23, 23).RGBA()
	return r != 255, nil
}

func (g *Game) getWeaponName(img image.Image) (string, error) {
	var name string
	text, err := utils.GetTextFromImage(img)
	if err != nil {
		return "", err
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
	} else if strings.HasPrefix(text, "au") {
		name = "AUG"
	} else if strings.Contains(text, "bz") {
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

	return name, nil
}

func (g *Game) getWeapon(img image.Image) (*weapon.Weapon, error) {
	imgName, err := utils.CropImage(img, screen_coords.WeaponName)
	if err != nil {
		return nil, err
	}

	weaponName, err := g.getWeaponName(imgName)
	if err != nil {
		return nil, err
	}

	if len(weaponName) == 0 {
		return nil, nil
	}

	var grip weapon.Grip
	for gripName, assets := range assets.GripAssets {
		if len(grip) > 0 {
			break
		}

		for _, filepath := range assets {
			template := gocv.IMRead(filepath, gocv.IMReadGrayScale)
			match, err := utils.MatchImage(img, template)
			if err != nil {
				return nil, err
			}

			if match {
				grip = gripName
				break
			}
		}
	}

	var muzzle weapon.Muzzle
	for muzzleName, assets := range assets.MuzzleAssets {
		if len(muzzle) > 0 {
			break
		}

		for _, filepath := range assets {
			template := gocv.IMRead(filepath, gocv.IMReadGrayScale)
			match, err := utils.MatchImage(img, template)
			if err != nil {
				return nil, err
			}

			if match {
				muzzle = muzzleName
				break
			}
		}
	}

	w := weapon.NewWeapon(weaponName)
	w.Grip = grip
	w.Muzzle = muzzle

	return w, nil
}

func (g *Game) getWeapons(screenshot image.Image) ([]*weapon.Weapon, error) {
	weapons := make([]*weapon.Weapon, 0)
	firstWeaponImg, err := utils.CropImage(screenshot, screen_coords.FirstGun)
	if err != nil {
		return nil, err
	}

	w, err := g.getWeapon(firstWeaponImg)
	if err != nil {
		return nil, err
	}
	if w != nil {
		weapons = append(weapons, w)
	}

	secondWeaponImg, err := utils.CropImage(screenshot, screen_coords.SecondGun)
	if err != nil {
		return nil, err
	}

	w, err = g.getWeapon(secondWeaponImg)
	if err != nil {
		return nil, err
	}
	if w != nil {
		weapons = append(weapons, w)
	}

	return weapons, nil
}
