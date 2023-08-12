import time
from threading import Thread

import keyboard
from PIL import ImageGrab

import game_functions

ACTIVE = None
SCAN = True
WEAPONS = []

def active_weapon(slot: int):
  global ACTIVE
  if len(WEAPONS) < 2:
    ACTIVE = None
    return

  print(WEAPONS)
  print(WEAPONS[slot - 1])
  ACTIVE = WEAPONS[slot - 1].name

def hook():
  global ACTIVE
  global SCAN

  while True:
    key = keyboard.read_key()

    match key:
      case "1":
        active_weapon(1)
      case "2":
        active_weapon(2)
      case "tab":
        SCAN = True
    time.sleep(0.1)

def scan():
  global WEAPONS
  global SCAN
  # imgF = Image.open("examples/Example3.png")

  # img = imgF.crop(screen_coords.FIRST_GUN.get_coords())
  # img.save("./fa.jpg")

  # x = img.crop(screen_coords.ATTACHMENTS["Grip"].get_coords())
  # x.save("./fa2.jpg")

  # mu = cv2.imread("assets/attachments/vertical.jpg", 0)

  # utils.match_image(img, mu)

  # print(utils.get_weapon_name(img))

  while True:
    if SCAN == False:
      time.sleep(0.05)
      continue

    screenshot = ImageGrab.grab(None)
    is_inventory_opening = game_functions.is_inventory_opening(screenshot)
    if is_inventory_opening == False:
      SCAN = False
      time.sleep(0.05)
      continue

    WEAPONS = game_functions.get_guns(screenshot)
    print(WEAPONS)

    time.sleep(0.5)
    # break

if __name__ == "__main__":
  hook_thread = Thread(target=hook)
  hook_thread.daemon = True
  hook_thread.start()

  scan_thread = Thread(target=scan)
  scan_thread.daemon = True
  scan_thread.start()

  while True:
    time.sleep(0.01)
