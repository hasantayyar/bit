FROM node:boron

# Create app directory
RUN 		mkdir -p /usr/src/app
WORKDIR 	/usr/src/app
RUN			apt-get update && apt-get install -y mongodb
# Install app dependencies

COPY package.json /usr/src/app/
RUN 		npm install

# Bundle app source
COPY . /usr/src/app

EXPOSE 3000
CMD [ "npm", "start" ]
