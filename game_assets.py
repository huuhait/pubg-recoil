MUZZLE: dict[str] = {
  "compensator": "assets/attachments/compensator.jpg"
}

FOREGRIP: dict[str] = {
  "vertical": "assets/attachments/vertical.jpg"
}

WEAPONS: list = ["m416", "akm"]

SCOPE_FACTORS = {
  "x1": 1,
  "x2": 1.8,
  "x3": 2.6,
  "x4": 3.64,
  "x8": 5.40
}

GRIP_FACTORS = {
  None: 1,
  "vertical": "1.25",
  "half": "1.2",
  "thumb": "1.1"
}

MUZZLE_FACTOR = {
  None: 1,
  "flash hider": 1.28,
  "compensator": 1.298
}

RECOIL_OFFSETS = {
  "akm": {
    "interval": 10,
    "delay_indexes": {
      0: 5,
      450: 6,
      550: 6.5,
      750: 7,
      800: 7.45,
      900: 8,
      1050: 8.1,
      1250: 8,
    },
    "scopes": [[1, 1], [1, 2]]
  }
}
