# Chapter 08

## Prerequisites

The following software is required to run the sample:

- Git
- Node.js
- npm
- Bash
- Docker with Docker Compose

## Running

Go to the current directory and run the application:

```sh
docker compose up
```

Running the application will first install all required package dependencies.

Once you closed the application you can also remove it using:

```sh
docker compose down
```

## Steps

Follow these steps to implement the same from scratch.

1. Copy over the MFs (blue, red, green) from the previous chapter (e.g., `07-blue`)

2. Change paths in the HTML files to resolve directly, e.g., in blue you change `./basket-info.css` to `/blue/basket-info.css`

3. Also prefix the URLs in the server, e.g., in blue you change `app.use(express.static("public"));` to `app.use("/blue", express.static("public"));`

4. Keep in mind to migrate URLs for use outside of the MF, too, for instance change ``res.redirect(`/buy-button?sku=${sku}`);`` to ``res.redirect(`http://localhost:1234/red/product-page?sku=${sku}`);``

5. Create a new directory for the edge-side service

6. Fill it with a Dockerfile using the `nginx:latest` image containing a local *nginx.conf* configuration file:

```dockerfile
FROM nginx:latest

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
```

7. In the server have a section for each MF, e.g., for the red micro frontend you should have

```nginx
location /red {
    ssi on;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-NginX-Proxy true;
    proxy_pass http://red:2001;
    proxy_ssl_session_reuse off;
    proxy_set_header Host $http_host;
    proxy_cache_bypass $http_upgrade;
    proxy_redirect off;
}
```

Change the URLs of the MFs respectively. In the sample we refer to `red` to access the `red` Docker container running within the Docker network.

8. Modify the used ESI tags with SSI, e.g., in the red micro frontend replace

```html
<esi:include src="/mf-blue/buy-button?sku=<%= current.sku %>" />
```

with

```html
<!--# include virtual="/blue/buy-button?sku=<%= current.sku %>" -->
```

9. Extend the fragment in the red MF to be a full HTML document

10. Create a Dockerfile for each Micro Frontend, e.g., for the `red` micro frontend

```dockerfile
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
EXPOSE 2001
```

11. Create a `docker-compose.yml` that combines the different Docker containers into one micro service network:

```yml
services:
  web:
    build: ./edge
    ports:
      - "1234:80"
  blue:
    build: ./blue
  green:
    build: ./green
  red:
    build: ./red
```

**Note**: Only the edge layer is exposed to the outside (on port `1234`). All others are only accessible inside the Docker network using their respective container name and port (e.g., via `http://red:2001`).
