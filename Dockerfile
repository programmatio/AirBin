
FROM node:6.2.1

# Create app directory  
RUN mkdir -p /usr/src/airbin
WORKDIR /usr/src/airbin

# Install app dependencies
COPY package.json /usr/src/airbin/
RUN npm install request -g
RUN npm install pm2 -g
RUN npm install

# Bundle app source
COPY config /usr/src/airbin/config
COPY app /usr/src/airbin/app
COPY public /usr/src/airbin/public
COPY test /usr/src/airbin/test
COPY server.js /usr/src/airbin/
COPY Gulpfile.js /usr/src/airbin/

EXPOSE 8080
CMD [ "node", "server.js" ]
