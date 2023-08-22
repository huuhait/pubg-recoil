import time

import easyocr


def main():
  reader = easyocr.Reader(['en'], gpu=True)

  while True:
    print(time.time())
    result = reader.readtext("3.jpg", detail = 0)
    print(time.time())
    print(result)
    time.sleep(5)

if __name__ == "__main__":
  main()
