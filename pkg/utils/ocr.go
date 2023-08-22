package utils

import (
	"fmt"
	"image"
	"image/png"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"syscall"

	"github.com/google/uuid"
	"github.com/zsmartex/pkg/v2/log"
)

func nuke(f *os.File) {
	name := f.Name()
	f.Close()
	if err := os.Remove(name); err != nil {
		log.Error(err)
	}
}

func GetTextFromImage(img image.Image, options ...string) (string, error) {
	tempFile, err := createTempFile()
	if err != nil {
		return "", fmt.Errorf("create temp file %v", err)
	}
	defer nuke(tempFile)

	if err = png.Encode(tempFile, img); err != nil {
		return "", fmt.Errorf("save temp image %v", err)
	}

	cmd := exec.Command("tesseract", "--psm", "6", "--oem", "3", "./"+strings.ReplaceAll(tempFile.Name(), "\\", "/"), "stdout")
	cmd.SysProcAttr = &syscall.SysProcAttr{HideWindow: true}
	out, err := cmd.Output()
	if err != nil {
		// fmt.Println(fmt.Sprint(err) + ": " + stderr.String()) // To trace error
		return "", err
	}

	result := strings.TrimSpace(string(out))

	return result, nil
}

func createTempFile() (*os.File, error) {
	filename := fmt.Sprintf("%s.png", uuid.New())
	ext := filepath.Ext(filename)
	prefix := filename[:len(filename)-len(ext)]
	tempDir := filepath.Join(".", "data")
	if err := os.MkdirAll(tempDir, os.ModePerm); err != nil {
		return nil, err
	}
	return os.CreateTemp(tempDir, prefix+"_*"+ext)
}
