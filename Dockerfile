# syntax=docker/dockerfile:1
   
FROM node:18-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
RUN npm install -g nodemon
COPY package.json /usr/src/app/
RUN npm install 
COPY . /usr/src/app/
EXPOSE 8080
CMD [ "npm", "start" ]