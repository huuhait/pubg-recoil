# distutils: language = c++
# cython: language_level=3
# distutils: extra_compile_args = /openmp
# distutils: extra_link_args = /openmp


from cython.parallel cimport prange
cimport cython
import numpy as np
cimport numpy as np
import cython
from collections import defaultdict
import time

@cython.boundscheck(False)
@cython.wraparound(False)
@cython.cdivision(True)
cpdef getpixel(unsigned char[:] pic, int x, int y, int width, int totallengthpic):
  cdef my_dict = defaultdict(list)
  cdef int i
  for i in range(0, totallengthpic, 3):
    r = pic[i]
    g = pic[i+1]
    b = pic[i+2]
    my_dict[(r,g,b)].append(i)

  for key in my_dict.keys():
    my_dict[key] = np.dstack(np.divmod(np.array(my_dict[key]) // 3, width))[0]

  for key in my_dict.keys():
    locates = my_dict[key]
    for locate in locates:
      if locate[0] == x and locate[1] == y:
        return key

  return None
