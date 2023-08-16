import os
import time
from threading import Thread

import comps
import easyocr
import game_assets
import game_functions
import keyboard
import mk_functions
import screen_coords

RUNNING = True
COMP = ""

def switch_loop():
  global RUNNING
  global COMP

  while True:
    key = keyboard.read_key()
    match key:
      case "insert":
        os.system('clear')
        if RUNNING == False:
          print("Start scanning...")
          RUNNING = True
          time.sleep(0.5)
        else:
          print("Stop scanning...")
          RUNNING = False
          time.sleep(0.5)
      case "home":
        COMP = "Yordle"
        time.sleep(0.5)
      case "end":
        COMP = "Ionia"
        time.sleep(0.5)
      case "delete":
        COMP = "Void"
        time.sleep(0.5)

def scan(reader: easyocr.Reader):
  global RUNNING
  global COMP
  champs_to_buy: list = comps.listComp[COMP]
  print(f"  Start scanning champions")
  print(f"  Selected Champions: {champs_to_buy}")

  shop: list = game_functions.get_shop(reader)

  shop_champions = []
  for champion in shop:
    if champion[1]:
      shop_champions.append(champion[1])

  if len(shop_champions) == 0:
    print(f"  No champions was found!")
    return

  gold = game_functions.get_gold(reader)
  print(f"  Shop: {shop_champions}")
  print(f"  Gold: {gold}")

  for champion in shop:
    if (champion[1] in champs_to_buy and
      gold - game_assets.CHAMPIONS[champion[1]]["Gold"] >= 0
    ):
      mk_functions.left_click(screen_coords.BUY_LOC[champion[0]].get_coords())
      time.sleep(0.01)

def game_loop():
  global RUNNING
  global COMP

  # ocr = paddleocr.PaddleOCR(use_angle_cls=False, lang="en", use_gpu=True)
  reader = easyocr.Reader(['en'], gpu=True)

  # while True:
  #   print(time.time())
  #   result = reader.readtext("0.jpg", detail = 0)
  #   print(time.time())
  #   print(result)
  #   time.sleep(5)

  while True:
    if RUNNING == False:
      time.sleep(0.02)
      continue

    os.system('cls')
    print(f"  Home: Yordle")
    print(f"  End: Ionia")
    if COMP == "":
      print(f"  No comp selected")
      time.sleep(0.02)
      continue

    scan(reader)
    time.sleep(0.02)

if __name__ == "__main__":
  switch_thread = Thread(target=switch_loop)
  switch_thread.daemon = True
  switch_thread.start()

  game_thread = Thread(target=game_loop)
  game_thread.daemon = True
  game_thread.start()

  while True:
    time.sleep(1)
