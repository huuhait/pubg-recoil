from distutils.core import Extension, setup

import numpy
from Cython.Build import cythonize

package = Extension('lib', ['lib.pyx'], include_dirs=[numpy.get_include()])
setup(ext_modules=cythonize([package]))
