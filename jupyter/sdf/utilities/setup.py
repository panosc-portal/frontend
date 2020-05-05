import os
from distutils.core import setup, Extension
import numpy

# Remove environment variables that can break the build, if set incorrectly.
# FIXME: The variable 'EXTRA_COMPILE_ARGS' may still break the installation in some cases,
# if it is set in CMakeLists.txt and CMAKE_C_COMPILER differs from the one used to build
# the Python interpreter.
for key in ['CC', 'CFLAGS']:
    if key in os.environ:
        del os.environ[key]

setup(
    name='sdfpy',
    version='1.0',
    author='Keith Bennett',
    author_email='K.Bennett@warwick.ac.uk',
    url='http://github.com/keithbennett/SDF.git',
    description='Python module for processing SDF files',
    py_modules=['sdf_legacy'],
    ext_modules=[
        Extension(
            'sdf',
            [os.path.join("/home/jm/sdfsource/SDF-master/utilities", 'sdf_python.c')],
            include_dirs=[numpy.get_include(), '.', '/home/jm/sdfsource/SDF-master/C/include'],
            library_dirs=['/home/jm/sdfsource/SDF-master/C/src'], libraries=['sdfc'],
            extra_compile_args=['-O3', '-D_XOPEN_SOURCE=600']
            + ''.replace(';', '\n').split(),
            extra_link_args=['-Wl,-rpath=/usr/local/lib']
        )
    ],
    package_dir={'': '/home/jm/sdfsource/SDF-master/utilities'}
)
