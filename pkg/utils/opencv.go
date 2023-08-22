package utils

import (
	"image"

	"gocv.io/x/gocv"
)

func MatchImage(img image.Image, template gocv.Mat) (match bool, err error) {
	matImg, err := gocv.ImageToMatRGBA(img)
	if err != nil {
		return false, err
	}
	result := gocv.NewMat()
	defer result.Close()
	mask := gocv.NewMat()
	gocv.MatchTemplate(matImg, template, &result, gocv.TmCcoeffNormed, mask)
	mask.Close()

	return
}
