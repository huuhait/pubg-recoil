package utils

import (
	"image"
	"image/color"

	"github.com/oliamb/cutter"
)

func CropImage(img image.Image, bounds image.Rectangle) (image.Image, error) {
	return cutter.Crop(img, cutter.Config{
		Width:  bounds.Dx(),
		Height: bounds.Dy(),
		Anchor: image.Point{
			X: bounds.Max.X,
			Y: bounds.Max.Y,
		},
	})
}

func GetPixel(img image.Image, x, y int) color.Color {
	return img.At(x, y)
}
