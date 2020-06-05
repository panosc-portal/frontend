FROM frolvlad/alpine-miniconda3
WORKDIR /app
COPY ./notebook/. .
RUN conda install jupyterlab numpy scipy matplotlib plotly sympy ipympl nodejs
CMD jupyter notebook --allow-root --ip=0.0.0.0  --NotebookApp.token='' --NotebookApp.password=''
