#----------------------------------------------------------------
# Generated CMake target import file.
#----------------------------------------------------------------

# Commands may need to know the format version.
set(CMAKE_IMPORT_FILE_VERSION 1)

# Import target "sdfc" for configuration ""
set_property(TARGET sdfc APPEND PROPERTY IMPORTED_CONFIGURATIONS NOCONFIG)
set_target_properties(sdfc PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_NOCONFIG "C"
  IMPORTED_LOCATION_NOCONFIG "${_IMPORT_PREFIX}/lib/libsdfc.a"
  )

list(APPEND _IMPORT_CHECK_TARGETS sdfc )
list(APPEND _IMPORT_CHECK_FILES_FOR_sdfc "${_IMPORT_PREFIX}/lib/libsdfc.a" )

# Commands beyond this point should not need to know the version.
set(CMAKE_IMPORT_FILE_VERSION)
