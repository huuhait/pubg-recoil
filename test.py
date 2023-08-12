#!/usr/local/bin/python
# -*- coding: utf-8 -*-

import cv2
import numpy as np
from imutils.object_detection import non_max_suppression

# Reading the image and the template
img = cv2.imread('examples/Example1.jpg')
temp = cv2.imread('assets/attachments/A.png')

# save the image dimensions
W, H = temp.shape[:2]

# Define a minimum threshold
thresh = 0.4

# Converting them to grayscale
img_gray = cv2.cvtColor(img,
                        cv2.COLOR_BGR2GRAY)
temp_gray = cv2.cvtColor(temp,
                         cv2.COLOR_BGR2GRAY)

# Passing the image to matchTemplate method
match = cv2.matchTemplate(
    image=img_gray, templ=temp_gray,
  method=cv2.TM_CCOEFF_NORMED)

# Select rectangles with
# confidence greater than threshold
(y_points, x_points) = np.where(match >= thresh)

# initialize our list of rectangles
boxes = list()

# loop over the starting (x, y)-coordinates again
for (x, y) in zip(x_points, y_points):

    # update our list of rectangles
    boxes.append((x, y, x + W, y + H))

# apply non-maxima suppression to the rectangles
# this will create a single bounding box
boxes = non_max_suppression(np.array(boxes))

# loop over the final bounding boxes
for (x1, y1, x2, y2) in boxes:

    # draw the bounding box on the image
    cv2.rectangle(img, (x1, y1), (x2, y2),
                  (255, 0, 0), 3)

# Show the template and the final output
cv2.imshow("Template", temp)
cv2.imshow("After NMS", img)
cv2.waitKey(0)

# destroy all the windows
# manually to be on the safe side
cv2.destroyAllWindows()
