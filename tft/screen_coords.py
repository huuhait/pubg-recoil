from vec2 import Vec2
from vec4 import GameWindow, Vec4

CHAMP_NAME_POS: list[Vec4] = [
  Vec4(GameWindow(3, 3, 157, 30), use_screen_offset=False),
  Vec4(GameWindow(266, 3, 420, 30), use_screen_offset=False),
  Vec4(GameWindow(535, 3, 689, 30), use_screen_offset=False),
  Vec4(GameWindow(805, 3, 959, 30), use_screen_offset=False),
  Vec4(GameWindow(1072, 3, 1226, 30), use_screen_offset=False),
]

SHOP_POS: Vec4 = Vec4(GameWindow(645, 1390, 1965, 1422))

GOLD_POS: Vec4 = Vec4(GameWindow(1110, 1175, 1235, 1212))

BUY_LOC: list[Vec2] = [
    Vec2(739, 1352),
    Vec2(972, 1352),
    Vec2(1271, 1352),
    Vec2(1542, 1352),
    Vec2(1811, 1352),
]
