"""
Handles sending input to the game, coords contain a cartesian ordered pair (x, y)
"""

import ctypes
import random
import time


def click():
    ctypes.windll.user32.mouse_event(2, 0, 0, 0,0) # left down
    time.sleep(0.005)
    ctypes.windll.user32.mouse_event(4, 0, 0, 0,0) # left up

def left_click(coords: tuple) -> None:
    """Left clicks at argument ones coordinates"""
    offset: int = random.randint(-3, 3)
    ctypes.windll.user32.SetCursorPos(coords[0] - offset, coords[1] - offset)
    click()
