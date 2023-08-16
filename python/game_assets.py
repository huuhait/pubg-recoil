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

WEAPONS: list = ["m416", "akm", "aug", "beryl", "qbz", "ace32", "g36c", "vector"]

SCOPE_FACTORS = {
  "x1": 1,
  "x2": 1.8,
  "x3": 2.6,
  "x4": 3.64,
  "x8": 5.40
}

GRIP_FACTORS = {
  None: 1,
  "vertical": 1.24,
  "half": 1.2,
  "thumb": 1.1
}

MUZZLE_FACTOR = {
  None: 1,
  "flash hider": 1.175,
  "compensator": 1.25
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
      0: 10,
      150: 12,
      250: 14,
      350: 15,
      480: 16,
      550: 16.5,
      650: 17.5,
    },
    "scopes": [[1, 1], [1, 2]]
  },
  "m416": {
    "interval": 10,
    "delay_indexes": {
      0: 10,
      150: 12,
      250: 14,
      350: 15,
      420: 16,
      450: 17,
      650: 18,
    },
    "scopes": [[1, 1], [1, 2]]
  },
  "aug": {
    "interval": 20,
    "delay_indexes": {
      0: 14,
      50: 15,
      150: 16,
      180: 20,
      200: 22,
      220: 24,
      250: 26,
      280: 27.5,
      300: 29,
      400: 26,
    },
    "scopes": [[1, 1], [1, 2]]
  },
  "beryl": {
    "interval": 20,
    "delay_indexes": {
      0: 20,
      150: 23,
      240: 25,
      320: 26,
      450: 29,
      500: 32,
    },
    "scopes": [[1, 1], [1, 2]]
  },
  "qbz": {
    "interval": 10,
    "delay_indexes": {
      0: 8,
      250: 8.5,
      290: 10.5,
      350: 12.5,
      400: 14.5,
      450: 15.2,
      550: 16.8,
    },
    "scopes": [[1, 1], [1, 2]]
  },
  "ace32": {
    "interval": 10,
    "delay_indexes": {
      0: 12,
      150: 13,
      250: 16,
      350: 18,
      480: 19,
      550: 20.5,
    },
    "scopes": [[1, 1], [1, 2]]
  },
  "g36c": {
    "interval": 10,
    "delay_indexes": {
      0: 10,
      150: 11,
      250: 12,
      350: 15,
      480: 14.5,
      550: 16.5,
    },
    "scopes": [[1, 1], [1, 2]]
  },
  # "vector": {
  #   "interval": 10,
  #   "delay_indexes": {
  #     0: 4.8,
  #     250: 5.3,
  #     350: 6.5,
  #     400: 6.8,
  #     450: 7,
  #     500: 7.4,
  #     550: 7.8,
  #     600: 8.5,
  #     650: 8.8,
  #     700: 9.2,
  #     840: 9.6,
  #     880: 10.2,
  #   },
  #   "scopes": [[1, 1], [1, 2]]
  # }
}
