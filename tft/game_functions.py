
import threading
from difflib import SequenceMatcher

import easyocr
import game_assets
import ocr
import screen_coords
from PIL import ImageDraw, ImageGrab
from vec4 import Vec4


def get_gold(reader: easyocr.Reader) -> int:
  """Returns the gold for the tactician"""
  screen_capture = ImageGrab.grab(bbox=screen_coords.GOLD_POS.get_coords())
  draw = ImageDraw.Draw(screen_capture)
  draw.rectangle((20, 8, 45, 78), fill=(22, 32, 32))
  gold: str = ocr.get_text_from_image(reader, image=screen_capture, whitelist="0123456789")
  try:
      return int(gold)
  except ValueError:
      return 0

def valid_champ(champ: str) -> str:
    """Matches champion string to a valid champion name string and returns it"""
    if champ in game_assets.CHAMPIONS:
        return champ

    return next(
        (
            champion
            for champion in game_assets.CHAMPIONS
            if SequenceMatcher(a=champion, b=champ).ratio() >= 0.7
        ),
        "",
    )

def get_champ(reader: easyocr.Reader, screen_capture: ImageGrab.Image, name_pos: Vec4, shop_pos: int, shop_array: list):
    """Returns a tuple containing the shop position and champion name"""
    image = screen_capture.crop(name_pos.get_coords())
    champ: str = ocr.get_text_from_image(reader, image=image, whitelist="")
    shop_array.append((shop_pos, valid_champ(champ)))


def get_shop(reader: easyocr.Reader) -> list:
    """Returns the list of champions in the shop"""
    screen_capture = ImageGrab.grab(bbox=screen_coords.SHOP_POS.get_coords())

    shop: list = []
    for shop_index, name_pos in enumerate(screen_coords.CHAMP_NAME_POS):
        get_champ(reader, screen_capture, name_pos, shop_index, shop)
    return shop
