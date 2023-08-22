package utils

import (
	"image"

	"gocv.io/x/gocv"
)

func MatchImage(img image.Image, template gocv.Mat) (match bool, err error) {
	imageResize := ImageResize(img, 3)
	imgGray := ImageToGrayScale(imageResize)
	matImg, err := gocv.ImageGrayToMatGray(imgGray)
	if err != nil {
		return false, err
	}
	matResult := gocv.NewMat()
	defer matResult.Close()
	mask := gocv.NewMat()
	gocv.MatchTemplate(matImg, template, &matResult, gocv.TmCcoeffNormed, mask)
	mask.Close()

	_, maxVal, _, _ := gocv.MinMaxLoc(matResult)

	return maxVal >= 0.85, nil
}
