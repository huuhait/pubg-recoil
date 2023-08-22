package utils

import (
	"image"

	"github.com/kbinani/screenshot"
)

func Screenshot(bounds image.Rectangle) (*image.RGBA, error) {
	return screenshot.CaptureRect(bounds)
}
