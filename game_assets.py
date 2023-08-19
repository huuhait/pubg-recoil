MUZZLE: dict[str, list[str]] = {
  "compensator": [
    "assets/attachments/compensator/1.jpg",
    "assets/attachments/compensator/2.jpg",
    "assets/attachments/compensator/3.jpg",
    "assets/attachments/compensator/4.jpg",
    "assets/attachments/compensator/5.jpg",
  ]
}

FOREGRIP: dict[str, list[str]] = {
  "vertical": [
    "assets/attachments/vertical/1.jpg",
    "assets/attachments/vertical/2.jpg",
    "assets/attachments/vertical/3.jpg",
  ]
}

WEAPONS: list = ["m416", "akm", "aug", "beryl", "qbz", "ace32", "g36c", "vector", "groza", "p90"]

SCOPE_FACTORS = {
  "x1": 1,
  "x2": 1.8,
  "x3": 2.6,
  "x4": 3.64,
  "x8": 5.40
}

GRIP_FACTORS = {
  None: 1,
  "vertical": 1.25,
  "half": 1.2,
  "thumb": 1.1
}

MUZZLE_FACTOR = {
  None: 1,
  "flash hider": 1.14,
  "compensator": 1.28
}

STANDS = {
  "stand": {
    "img": "assets/stand/stand.png",
    "value": 1
  },
  "sit": {
    "img": "assets/stand/sit.png",
    "value": 1.3
  },
  "lie": {
    "img": "assets/stand/lie.png",
    "value": 1.8
  },
}

RECOIL_OFFSETS = {
  "akm": {
    "interval": 10,
    "delay_indexes": {
      0: 3.07,
      150: 3.7,
      250: 4.3,
      350: 4.61,
      480: 4.92,
      550: 5.07,
      650: 5.32,
    },
    "scopes": [[1, 1], [1, 2]]
  },
  "m416": {
    "interval": 10,
    "delay_indexes": {
      0: 3.07,
      150: 3.7,
      250: 4.3,
      350: 4.61,
      480: 4.92,
      550: 5.07,
      650: 5.32,
    },
    "scopes": [[1, 1], [1, 2]]
  },
  "aug": {
    "interval": 20,
    "delay_indexes": {
      0: 4.3,
      50: 4.61,
      150: 4.92,
      180: 6.15,
      200: 6.76,
      220: 7.38,
      250: 8,
      280: 8.46,
      300: 8.92,
      400: 8,
    },
    "scopes": [[1, 1], [1, 2]]
  },
  "beryl": {
    "interval": 20,
    "delay_indexes": {
      0: 9,
      320: 14,
    },
    "scopes": [[1, 1], [1, 2]]
  },
  "qbz": {
    "interval": 10,
    "delay_indexes": {
      0: 2.46,
      250: 2.61,
      290: 3.23,
      350: 3.84,
      400: 4.46,
      450: 4.67,
      550: 5.17,
    },
    "scopes": [[1, 1], [1, 2]]
  },
  "ace32": {
    "interval": 10,
    "delay_indexes": {
      0: 3.7,
      150: 4,
      250: 4.9,
      350: 5.5,
      480: 5.85,
      550: 6.3,
    },
    "scopes": [[1, 1], [1, 2]]
  },
  "g36c": {
    "interval": 10,
    "delay_indexes": {
      0: 3.07,
      150: 3.38,
      250: 3.7,
      350: 4.61,
      480: 4.46,
      550: 5.07,
    },
    "scopes": [[1, 1], [1, 2]]
  },
  "vector": {
    "interval": 10,
    "delay_indexes": {
      0: 3,
      500: 6,
    },
    "scopes": [[1, 1], [1, 2]]
  },
  "vector": {
    "interval": 10,
    "delay_indexes": {
      0: 3,
      500: 6,
    },
    "scopes": [[1, 1], [1, 2]]
  },
  "p90": {
    "interval": 40,
    "delay_indexes": {
      0: 8,
      100: 12,
      250: 7
    },
    "scopes": [[1, 1], [1, 2]]
  },
  "groza": {
    "interval": 10,
    "delay_indexes": {
      0: 3,
      450: 4,
      550: 5,
    },
    "scopes": [[1, 1], [1, 2]]
  }
}
