from PIL import Image


def image_resize(image: int, scale: int):
  """Resizes the image using the scale passed in argument two"""
  (width, height) = (image.width * scale, image.height * scale)
  return image.resize((width, height))


img = Image.open("f.jpg")

img = image_resize(img, 3)

img.save("3.jpg")
