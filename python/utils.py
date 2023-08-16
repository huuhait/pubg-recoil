from typing import Any

import cv2
import numpy as np
import pytesseract
from PIL import Image, ImageGrab

import lib

pytesseract.pytesseract.tesseract_cmd = r'C:\\Program Files\\Tesseract-OCR\\tesseract.exe'

def screenshot(screenxy: tuple) -> Image.Image:
  return ImageGrab.grab(bbox=screenxy)

def image_grayscale(image: ImageGrab.Image) -> Any:
    """Converts an image to grayscale so OCR has an easier time deciphering characters"""
    return cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

def image_array(image: ImageGrab.Image) -> Any:
    """Turns the image into an array"""
    image = np.array(image)
    return image

def image_resize(image: int, scale: int) -> Any:
    """Resizes the image using the scale passed in argument two"""
    (width, height) = (image.width * scale, image.height * scale)
    return image.resize((width, height))

def image_thresholding(image: ImageGrab.Image) -> Any:
    """Applies thresholding to the image https://docs.opencv.org/4.x/d7/d4d/tutorial_py_thresholding.html"""
    return cv2.threshold(image, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1]

def match_image(image: ImageGrab.Image, template: ImageGrab.Image) -> bool:
  resize = image_resize(image, 3)
  image_arr = image_array(resize)
  image_grayscalex = image_grayscale(image_arr)

  res = cv2.matchTemplate(image_grayscalex, template, cv2.TM_CCOEFF_NORMED)
  THRESHOLD = 0.5
  loc = np.where(res >= THRESHOLD)

  # Draw boudning box
  # w, h = template.shape[::-1]
  # for y, x in zip(loc[0], loc[1]):
  #   cv2.rectangle(image_grayscalex, (x, y), (x + w, y + h), (255,0,0), 1)
  # cv2.imshow('Detected', image_grayscalex)
  # cv2.waitKey(0)

  return np.any(loc) >= 1

def get_text(coord: tuple) -> str:
  image = screenshot(coord)
  resize = image_resize(image, 3)
  array = image_array(resize)
  grayscale = image_grayscale(array)
  thresholding = image_thresholding(grayscale)
  return pytesseract.image_to_string(thresholding, config='--oem 3 --psm 6 -c tessedit_char_whitelist=0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ').strip()

def get_text_from_image(image: ImageGrab.Image, coord: tuple) -> str:
  image = image.crop(coord)
  resize = image_resize(image, 3)
  array = image_array(resize)
  grayscale = image_grayscale(array)
  thresholding = image_thresholding(grayscale)
  return pytesseract.image_to_string(thresholding, config='--oem 3 --psm 6 -c tessedit_char_whitelist=0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ').strip()

def getpixel(pic, x, y):
    pipi = pic.ravel()
    totallenghtpic = pipi.shape[0]-1
    width = pic.shape[1]
    resus0 = lib.getpixel(pipi, x, y, width, totallenghtpic)
    return resus0
