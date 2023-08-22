package main

import (
	"fmt"

	"github.com/zsmartex/pkg/v2/log"
	"gocv.io/x/gocv"
)

func main() {
	log.New("pubg")

	// gui := gui.NewGUI()
	// game := game.NewGame(gui)

	// game.Start()

	fmt.Printf("gocv version: %s\n", gocv.Version())
	fmt.Printf("opencv lib version: %s\n", gocv.OpenCVVersion())
}
