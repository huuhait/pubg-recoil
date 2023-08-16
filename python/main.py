from pyuac import main_requires_admin

from game import Game


@main_requires_admin
def main():
  game = Game()
  game.start()

if __name__ == "__main__":
  main()
