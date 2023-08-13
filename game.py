import signal
from threading import Thread
from time import sleep

import keyboard
from PIL import ImageGrab
from pynput import mouse

import game_functions
from recoil import Recoil
from stats import PlayerStats
from weapon import Weapon


class Game:
  player_stats: PlayerStats = PlayerStats()
  weapons: list[Weapon] = []
  recoil: Recoil = Recoil(player_stats)

  scanning = False

  def __init__(self):
    return

  def on_mouse(self, x, y, button: mouse.Button, pressed):
    if button.name == "left":
      self.player_stats.set_fire(pressed)
    elif button.name == "right":
      self.player_stats.set_aim(pressed)

  def wait_for_fire(self):
    self.recoil.start()

  def mouse_hook(self):
    with mouse.Listener(on_click=self.on_mouse, kwargs=self) as listener:
      listener.join()

  def keyboard_hook(self):
    while True:
      key = keyboard.read_key()

      match key:
        case "1":
          self.player_stats.active_weapon(1)
        case "2":
          self.player_stats.active_weapon(2)
        case "tab":
          self.scanning = True
      sleep(0.1)

  def scan_hook(self):
    while True:
      if self.scanning == False:
        if self.player_stats.fire and self.player_stats.aim:
          self.player_stats.left_ammo = game_functions.get_ammo_left()
          sleep(0.02)
        else:
          sleep(0.05)
        continue

      screenshot = ImageGrab.grab(None)
      is_inventory_opening = game_functions.is_inventory_opening(screenshot)
      if is_inventory_opening == False:
        self.scanning = False
        sleep(0.05)
        continue

      weapons = game_functions.get_guns(screenshot)
      print(weapons)
      self.player_stats.update_weapons(weapons)
      sleep(0.5)

  def stop():
    exit(0)

  def start(self):
    keyboard_thread = Thread(target=self.keyboard_hook)
    keyboard_thread.daemon = True
    keyboard_thread.start()

    scan_thread = Thread(target=self.scan_hook)
    scan_thread.daemon = True
    scan_thread.start()

    fire_thread = Thread(target=self.wait_for_fire)
    fire_thread.daemon = True
    fire_thread.start()

    signal.signal(signal.SIGINT, self.stop)

    self.mouse_hook()

    # while True:
    #   sleep(0.1)
