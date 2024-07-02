FROM node:slim

ENV NODE_ENV development

# Setting up the work directory
WORKDIR /express-docker

# Copying all the files in our project
COPY . .

# Installing dependencies
RUN npm install

# Starting our application
CMD [ "node", "lib/index.js" ]

# Exposing server port
EXPOSE 2002
