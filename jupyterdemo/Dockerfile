FROM ubuntu:latest

WORKDIR /app
COPY . .
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update
RUN apt-get install -y make cmake python3 python3-pip git
RUN pip3 install jupyterlab numpy scipy matplotlib
# RUN git clone --recurse-submodule https://cfsa-pmw.warwick.ac.uk/SDF/SDF
WORKDIR /app/SDF
RUN cmake .
WORKDIR /app/SDF/C
RUN make
RUN make install
RUN cmake ../utilities/.
RUN ../utilities/build -3 -s
WORKDIR /app/demo
RUN jupyter lab
