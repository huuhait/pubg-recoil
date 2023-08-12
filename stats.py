from weapon import Weapon


class PlayerStats:
  weapons: list[Weapon] = []
  active_weapon_slot = None
  sitting: bool = False
  shift: bool = False
  fire: bool = False
  aim: bool = False

  def set_fire(self, fire: bool):
    self.fire = fire

  def set_aim(self, aim: bool):
    self.aim = aim

  def update_weapons(self, weapons: list[Weapon]):
    self.weapons = weapons
    if self.active_weapon_slot:
      self.active_weapon(self.active_weapon_slot)
    return

  def active_weapon(self, weapon_slot: int):
    if len(self.weapons) < weapon_slot:
      self.active_weapon_slot = None
      self.weapon = None
      return

    self.active_weapon_slot = weapon_slot

  def get_active_weapon(self):
    if self.active_weapon_slot == None:
      return None

    return self.weapons[self.active_weapon_slot - 1]
