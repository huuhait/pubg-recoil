import cv2
import numpy as np
import pyximport
from locate_pixelcolor_cythonmulti import search_colors
from PIL import Image, ImageGrab
from pixelmatch.contrib.PIL import pixelmatch

import lib

pyximport.install(setup_args={"script_args" : ["--verbose"]})
import time

import game_assets
import lib
import screen_coords
import utils
from weapon import Weapon


def get_stand_state():
  img_ingame = utils.screenshot(screen_coords.STAND.get_coords())
  img_ingame = utils.image_array(img_ingame)
  print(time.time())
  rStand, gStand, bStand = utils.getpixel(img_ingame, 38, 12)
  # rSit, gSit, bSit = utils.getpixel(img_ingame, 48, 37)
  rLie, gLie, bLie = utils.getpixel(img_ingame, 13, 49)
  state = "stand"
  if rStand > 200 and gStand > 200 and bStand > 200:
    state = "stand"
  elif rLie > 200 and gLie > 200 and bLie > 200:
    state = "lie"
  else:
    state = "sit"

  print(state)
  print(time.time())

  return game_assets.STANDS[state]["value"]


def get_weapon_name(weapon_image: ImageGrab.Image) -> str:
  name = utils.get_text_from_image(weapon_image, screen_coords.WEAPON_NAME.get_coords()).lower()

  if 'm4' in name:
    name = 'm416'
  elif 'beryl' in name:
    name = 'beryl'
  elif 'bz' in name:
    name = 'qbz'
  elif 'ace' in name:
    name = 'ace32'
  elif 'g3' in name:
    name = 'g36c'

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
  for foregrip_name, foregrips in game_assets.FOREGRIP.items():
    for fg in foregrips:
      if utils.match_image(image, cv2.imread(fg, 0)):
        foregrip = foregrip_name
        break
    if foregrip != None:
      break

  for muzzle_name, muzzles in game_assets.MUZZLE.items():
    for mz in muzzles:
      if utils.match_image(image, cv2.imread(mz, 0)):
        muzzle = muzzle_name
        break
    if muzzle != None:
      break

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

def get_ammo_left() -> bool:
  img = utils.screenshot(screen_coords.AMMO.get_coords())
  img = utils.image_array(img)
  colors0 = np.array([[255, 0, 0]], dtype=np.uint8)
  res  = search_colors(img, colors0)
  return len(res) == 0

def is_inventory_opening(screenshot: ImageGrab.Image) -> bool:
  return utils.get_text_from_image(screenshot, screen_coords.INVENTORY.get_coords()) == 'INVENTORY'
