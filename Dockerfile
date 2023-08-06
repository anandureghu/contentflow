# getting the sdk
FROM node:16

# copy package.json into docker
COPY package.json .

# install dependencies
RUN npm install

# copy project files into docker
COPY . .

EXPOSE 3000

# final command to run server
CMD ["npm", "start"]

