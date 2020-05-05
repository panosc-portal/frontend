FROM bitnami/minideb

WORKDIR /app
COPY . ./

RUN install_packages python3 python3-pip python3-setuptools
# RUN cmake ./sdf/.
RUN python3 -m pip install numpy scipy matplotlib

RUN python3 -m pip install ./sdf/utilities/.
