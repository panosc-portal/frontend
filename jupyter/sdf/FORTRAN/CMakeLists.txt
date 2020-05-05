cmake_minimum_required(VERSION 3.14)
project(SDF VERSION 1.5.16 LANGUAGES Fortran)
find_package(MPI REQUIRED)
find_package(PackSDF REQUIRED PATHS CMake)
include(CMake/CheckMPIVersion.cmake)

set(INHERIT_FLAGS OFF CACHE BOOL "Inherit compiler flags")

if(NOT INHERIT_FLAGS)
   if(${CMAKE_Fortran_COMPILER_ID} STREQUAL "PGI")
      set(CPU "" CACHE STRING "Which CPU? (see pgf90 man page for options)")
      if(CPU)
         set(CPU "-tp ${CPU}")
      endif()

      set(CMAKE_Fortran_FLAGS
          "-g -Mnodefaultunit -Ktrap=fp -mcmodel=medium -Mdclchk -Mnofma ${CPU} ${MPI_Fortran_COMPILE_FLAGS}"
         CACHE STRING "Fortran flags" FORCE)
      set(CMAKE_Fortran_FLAGS_RELEASE "-O2 -g -Mvect -Munroll"
         CACHE STRING "Fortran flags for release build" FORCE)
      set(CMAKE_Fortran_FLAGS_DEBUG
         "-O0 -g -Mbounds -Mchkfpstk -Mdepchk -Mstandard -C"
         CACHE STRING "Fortran flags for debug build" FORCE)

   elseif(${CMAKE_Fortran_COMPILER_ID} STREQUAL "Intel")
      set(CMAKE_Fortran_FLAGS "-fpe0 -g"
         CACHE STRING "Fortran flags" FORCE)
      set(CMAKE_Fortran_FLAGS_RELEASE "-O3 -g -ip -vec-report0"
         CACHE STRING "Fortran flags for release build" FORCE)
      set(CMAKE_Fortran_FLAGS_DEBUG
         "-O0 -g -u -init=snan -traceback -nothreads -fltconsistency -C -warn -save-temps -fpic -Wl,-no_pie"
         CACHE STRING "Fortran flags for debug build" FORCE)

   elseif(${CMAKE_Fortran_COMPILER_ID} STREQUAL "GNU")
      if(NOT APPLE)
         set(MCMODEL "-mcmodel=medium")
      endif()
      set(CMAKE_Fortran_FLAGS "-g -Wall -frecord-marker=4 ${MCMODEL}"
         CACHE STRING "Fortran flags" FORCE)
      set(CMAKE_Fortran_FLAGS_RELEASE "-O3 -g"
         CACHE STRING "Fortran flags for release build" FORCE)
      set(CMAKE_Fortran_FLAGS_DEBUG
         "-O0 -g -fimplicit-none -fbounds-check -fbacktrace -Wextra -ffpe-trap=invalid,zero,overflow -pedantic"
         CACHE STRING "Fortran flags for debug build" FORCE)

   endif()
endif()

file(GLOB_RECURSE SOURCE_ALL CMakeLists.txt Makefile* *.f90 ${PACK_FILES})

set(PACK_SOURCE_CODE 1 CACHE STRING "Pack source code")
set(PACK_GIT_DIFF 1 CACHE STRING "Pack git diff")
set(PACK_GIT_DIFF_FROM_ORIGIN 1 CACHE STRING "Pack git diff from origin")
set(GENERATE_CHECKSUM 1 CACHE STRING "Generate checksum")
set(F77_OUTPUT 0)

include_directories(${MPI_Fortran_INCLUDE_PATH})
add_subdirectory(src lib)

install(
    FILES
        CMake/PackSDFConfig.cmake
        CMake/pack.cmake.in
        CMake/ConfigurePackTarget.cmake
        src/pack.py
    DESTINATION lib/PackSDF
    COMPONENT develop
)
