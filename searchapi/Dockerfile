# pull official base image
FROM node:current-stretch

RUN git clone https://github.com/panosc-eu/search-api.git /app
RUN rm /app/data/db.json

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

RUN npm install --silent

COPY ./db.json /app/data/db.json

CMD ["npm", "start"]
