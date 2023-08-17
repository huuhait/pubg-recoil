from weapon import Weapon


class PlayerStats:
  weapons: list[Weapon] = []
  active_weapon_slot = None
  shift: bool = False
  fire: bool = False
  aim: bool = False
  bullets_left: bool = False
  stand_state: str = "stand"

  def set_fire(self, fire: bool):
    self.fire = fire

  def set_aim(self, aim: bool):
    self.aim = aim

  def get_bullets_left(self) -> bool:
    return self.bullets_left

  def set_bullets_left(self, left: bool):
    self.bullets_left = left

  def get_stand_state(self) -> str:
    return self.stand_state

  def get_stand_factor(self) -> float:
    match self.stand_state:
      case "stand":
        return 1
      case "sit":
        return 1.3
      case "lie":
        return 1.8
      case _:
        return 1

  def set_stand_state(self, state: str) -> str:
    self.stand_state = state

  def set_weapons(self, weapons: list[Weapon]):
    self.weapons = weapons
    if self.active_weapon_slot:
      self.active_weapon(self.active_weapon_slot)
    return

  def active_weapon(self, weapon_slot: int):
    if weapon_slot == None:
      self.active_weapon_slot = None
    elif len(self.weapons) < weapon_slot:
      self.active_weapon_slot = None
      return

    self.active_weapon_slot = weapon_slot

  def get_active_weapon(self):
    if self.active_weapon_slot == None:
      return None

    return self.weapons[self.active_weapon_slot - 1]
