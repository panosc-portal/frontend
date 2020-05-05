set(INSTALL_DIR $ENV{DESTDIR}/usr/local)
execute_process(
    COMMAND
        /usr/bin/python setup.py install
            --prefix=${INSTALL_DIR}
            --install-lib=${INSTALL_DIR}/lib/python
    WORKING_DIRECTORY /home/jm/sdfsource/SDF-master/utilities
    RESULT_VARIABLE RET)
if(RET)
   message(FATAL_ERROR "Could not install sdfpy")
endif()
