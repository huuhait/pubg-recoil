class Weapon:
  def __init__(self, name, foregrip, muzzle, sight):
    self.name = name
    self.muzzle = muzzle
    self.foregrip = foregrip
    self.sight = sight

  def __repr__(self):
    return f"<Weapon name:{self.name} muzzle:{self.muzzle} foregrip:{self.foregrip}>"

  def __str__(self):
    return f"Weapon: name is {self.name}, muzzle is {self.muzzle}, foregrip is {self.foregrip}"
