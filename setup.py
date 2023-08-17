from distutils.core import Extension, setup

import numpy as np
from Cython.Build import cythonize
from Cython.Distutils import build_ext

ext_modules=[
  Extension('colorsearchcythonmulti', ['colorsearchcythonmulti.pyx'], include_dirs=[np.get_include()], define_macros=[("NPY_NO_DEPRECATED_API", "NPY_1_7_API_VERSION")]),
  Extension('lib', ['lib.pyx'], include_dirs=[np.get_include()])
]

setup(
  ext_modules=cythonize(ext_modules)
)
