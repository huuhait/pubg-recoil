from vec2 import Vec2
from vec4 import GameWindow, Vec4

FIRST_GUN: Vec4 = Vec4(GameWindow(1760, 115, 2420, 375))
SECOND_GUN: Vec4 = Vec4(GameWindow(1760, 388, 2420, 648))

ATTACHMENTS: dict[Vec4] = {
  "Muzzle": Vec4(GameWindow(12, 187, 78, 253), use_screen_offset=False),
  "Grip": Vec4(GameWindow(148, 187, 215, 253), use_screen_offset=False),
  "Sight": Vec4(GameWindow(375, 38, 442, 99), use_screen_offset=False),
}

WEAPON_NAME: Vec4 = Vec4(GameWindow(62, 10, 300, 55), use_screen_offset=False)

INVENTORY: Vec4 = Vec4(GameWindow(489, 70, 666, 124))
