FROM node:boron

# Create app and db directory
RUN 		mkdir -p /usr/src/app && mkdir -p /data/db
WORKDIR 	/usr/src/app
RUN			apt-get update && apt-get install -y mongodb && mongod &
# Install app dependencies

COPY package.json /usr/src/app/
RUN 		npm install

# Bundle app source
COPY . /usr/src/app

EXPOSE 3000
EXPOSE 27017
CMD [ "npm", "start" ]
