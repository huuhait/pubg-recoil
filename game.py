import os
from threading import Thread
from time import sleep

import keyboard
from pynput import mouse

import game_functions
import utils
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
        case "3":
          self.player_stats.active_weapon(None)
        case "4":
          self.player_stats.active_weapon(None)
        case "5":
          self.player_stats.active_weapon(None)
        case "tab":
          self.scanning = True
      sleep(0.02)

  def scan_bullet(self):
    while True:
      try:
        if self.scanning == False and self.player_stats.is_aim_fire() and self.player_stats.get_active_weapon() != None:
          self.player_stats.set_bullets_left(game_functions.get_bullets_left())
        sleep(0.05)
      except:
        print("Something problem while update bullets left")

  def scan_stand(self):
    while True:
      try:
        if self.scanning == False and self.player_stats.is_aim_fire() and self.player_stats.get_bullets_left() and self.player_stats.get_active_weapon() != None:
          self.player_stats.set_stand_state(game_functions.get_stand_state())
        sleep(0.1)
      except:
        print("Something problem while update stand state")

  def scan_hook(self):
    while True:
      if self.scanning == False:
        sleep(0.02)
        continue

      screenshot = utils.screenshot((0, 0, 2560, 1440))
      is_inventory_opening = game_functions.is_inventory_opening(screenshot)
      if is_inventory_opening == False:
        self.scanning = False
        sleep(0.02)
        continue

      weapons = game_functions.get_guns(screenshot)
      self.player_stats.set_weapons(weapons)
      sleep(0.02)

  def print_hook(self):
    while True:
      selected_weapon = self.player_stats.get_active_weapon()
      selected_weapon_name = ""
      if selected_weapon != None:
        selected_weapon_name = selected_weapon.name

      print("Weapon slots:")
      weapons = self.player_stats.weapons
      for i, weapon in enumerate(weapons):
        print("   - {}: {}, Muzzle: {}, Grip: {}".format(i+1, weapon.name.upper(), weapon.muzzle, weapon.foregrip))
      print("Selected weapon: {}".format(selected_weapon_name))
      sleep(0.5)
      os.system('cls')

  def start(self):
    keyboard_thread = Thread(target=self.keyboard_hook, daemon=True)
    keyboard_thread.start()

    mouse_thread = Thread(target=self.mouse_hook, daemon=True)
    mouse_thread.start()

    scan_thread = Thread(target=self.scan_hook, daemon=True)
    scan_thread.start()

    scan_bullet_thread = Thread(target=self.scan_bullet, daemon=True)
    scan_bullet_thread.start()

    scan_stand_thread = Thread(target=self.scan_stand, daemon=True)
    scan_stand_thread.start()

    fire_thread = Thread(target=self.wait_for_fire, daemon=True)
    fire_thread.start()

    print_thread = Thread(target=self.print_hook, daemon=True)
    print_thread.start()

    while True:
      sleep(0.1)
