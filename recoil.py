import ctypes
from time import sleep

import game_assets
from stats import PlayerStats


class RecoilConfig:
  interval: int
  delay_indexes: dict[int, float]
  scopes: list[list[int, int]]

  def __init__(self, weapon_name: str):
    config = game_assets.RECOIL_OFFSETS[weapon_name]
    self.interval = config["interval"]
    self.delay_indexes = config["delay_indexes"]
    self.scopes = config["scopes"]

class Recoil:
  multiply_to_ideal = 12
  sensitive = 50
  factor = 1.2055 * pow(1.048, sensitive - 1)
  ms = 0

  player_stats: PlayerStats

  ostatokX = 0 # Didn't understand
  ostatokXneg = 0
  count = 0 # Update soon

  def __init__(self, player_stats: PlayerStats):
    self.player_stats = player_stats

  def start(self):
    while True:
      if self.player_stats.fire and self.player_stats.aim and self.player_stats.get_bullets_left() and self.player_stats.get_active_weapon() != None:
        self.fire()
        continue
      else:
        self.stop()
        sleep(0.01)

  def fire(self):
    self.weapon = self.player_stats.get_active_weapon()
    self.config = RecoilConfig(self.weapon.name)
    self.recoil()

  def recoil(self):
    x = 0
    y = 0

    current_index = 0
    for delay in self.config.delay_indexes:
      index = self.config.delay_indexes[delay]
      if self.ms >= delay:
        current_index = index

    print(self.player_stats.get_active_weapon().name, current_index, self.ms)
    pos = 0
    if self.ostatokX >= 1:
      pos = 1
    elif self.ostatokXneg <= 1:
      pos = -1

    x = (current_index * self.multiply_to_ideal / self.factor) * self.weapon.scope_factor() / self.weapon.grip_factor() / self.weapon.muzzle_factor() / self.player_stats.get_stand_factor() + pos
    self.ms += 10

    if (self.ostatokX >= 1):
      self.ostatokX -= 1
    elif self.ostatokXneg <= 1:
      self.ostatokXneg += 1

    if isinstance(x, int) == False:
      intX = int(x)
      if x > 0:
        self.ostatokX += float(f"0.{intX}")
      else:
        self.ostatokXneg -= float(f"0.{intX}")

    if self.player_stats.shift:
      ctypes.windll.user32.mouse_event(1, 0, int(x * 1.3), 0, 0)
    else:
      ctypes.windll.user32.mouse_event(1, 0, int(x), 0, 0)

    self.count += 1
    sleep(self.config.interval / 1000)

  def stop(self):
    self.count = 0
    self.ostatokX = 0
    self.ostatokXneg = 0
    self.ms = 0
    return
