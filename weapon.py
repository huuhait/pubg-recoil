import game_assets


class Weapon:
  def __init__(self, name: str, foregrip: str, muzzle: str, sight: str):
    self.name = name
    self.muzzle = muzzle
    self.foregrip = foregrip
    self.sight = sight

  def __repr__(self):
    return f"<Weapon name:{self.name} muzzle:{self.muzzle} foregrip:{self.foregrip}>"

  def __str__(self):
    return f"Weapon: name is {self.name}, muzzle is {self.muzzle}, foregrip is {self.foregrip}"

  def scope_factor(self) -> float:
    # game_assets.SCOPE_FACTORS[]
    return 1

  def muzzle_factor(self) -> float:
    return game_assets.MUZZLE_FACTOR[self.muzzle] or game_assets.MUZZLE_FACTOR[None]

  def grip_factor(self) -> float:
    return  game_assets.GRIP_FACTORS[self.foregrip] or game_assets.GRIP_FACTORS[None]

  def is_single(self) -> bool:
    return False
