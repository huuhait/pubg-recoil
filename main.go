package main

import (
	"github.com/huuhait/pubg-recoil/pkg/game"
	"github.com/huuhait/pubg-recoil/pkg/gui"
	"github.com/zsmartex/pkg/v2/log"
)

func main() {
	log.New("pubg")

	gui := gui.NewGUI()
	game := game.NewGame(gui)

	game.Start()
	gui.ShowAndRun()

	// fmt.Printf("gocv version: %s\n", gocv.Version())
	// fmt.Printf("opencv lib version: %s\n", gocv.OpenCVVersion())
}
