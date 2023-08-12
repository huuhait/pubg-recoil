import cv2
import pytesseract
from PIL import Image, ImageGrab

import game_assets
import screen_coords
import utils
from weapon import Weapon


def get_weapon_name(weapon_image: ImageGrab.Image) -> str:
  name = pytesseract.image_to_string(weapon_image.crop(screen_coords.WEAPON_NAME.get_coords())).strip().lower()

  if name.startswith('m4'):
    name = 'm416'

  if name in game_assets.WEAPONS:
    return name
  else:
    return "none"

def get_gun(image: ImageGrab.Image):
  # screenshot = Image.open("examples/Example1.png")
  # screenshot = screenshot.crop(coord)
  name = get_weapon_name(image)
  if name == "none":
    return

  foregrip = None
  muzzle = None
  for fg in game_assets.FOREGRIP:
    if utils.match_image(image, cv2.imread(game_assets.FOREGRIP[fg], 0)):
      foregrip = fg

  for mz in game_assets.MUZZLE:
    if utils.match_image(image, cv2.imread(game_assets.MUZZLE[mz], 0)):
      muzzle = mz

  return Weapon(name, foregrip, muzzle, None)

def get_guns(screenshot: ImageGrab.Image) -> dict[str, Weapon]:
  first = get_gun(screenshot.crop(screen_coords.FIRST_GUN.get_coords()))
  second = get_gun(screenshot.crop(screen_coords.SECOND_GUN.get_coords()))

  result = []
  if first:
    result.append(first)
  if second:
    result.append(second)

  return result

def is_inventory_opening(screenshot: ImageGrab.Image) -> bool:
  return utils.get_text_from_image(screenshot, screen_coords.INVENTORY.get_coords()) == 'INVENTORY'
