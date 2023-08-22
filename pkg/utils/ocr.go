package utils

import (
	"bytes"
	"fmt"
	"image"
	"image/png"
	"os"
	"os/exec"
	"path/filepath"
	"strings"

	"github.com/google/uuid"
)

func GetTextFromImage(img image.Image, options ...string) (string, error) {
	tempFile, err := createTempFile()
	if err != nil {
		return "", fmt.Errorf("create temp file %v", err)
	}

	defer tempFile.Close()

	if err = png.Encode(tempFile, img); err != nil {
		return "", fmt.Errorf("save temp image %v", err)
	}
	defer os.Remove(tempFile.Name())

	cmd := exec.Command("tesseract", tempFile.Name(), strings.Join(options, " "), "stdout")
	var out bytes.Buffer
	cmd.Stdout = &out
	err = cmd.Run()
	if err != nil {
		return "", fmt.Errorf("")
	}

	return out.String(), nil
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
