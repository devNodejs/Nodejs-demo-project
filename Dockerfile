FROM node:12

WORKDIR /nodejs-demo-project
ADD . /nodejs-demo-project

RUN npm install
EXPOSE ${PORT}
CMD npm start
RUN npm audit fix