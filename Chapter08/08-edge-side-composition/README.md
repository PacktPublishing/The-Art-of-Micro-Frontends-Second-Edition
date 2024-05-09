# Chapter 08

## Prerequisites

The following software is required to run the sample:

- Git
- Node.js
- npm
- Bash
- Docker

## Running

Go to the current directory and run the application:

```sh
./run.sh
```

Running the application will first install all required package dependencies.

## Steps

Follow these steps to implement the same from scratch.

1. Copy over the MFs (blue, red, green) from the previous chapter (e.g., `07-blue`)

2. Change paths in the HTML files to resolve directly, e.g., in blue you change `./basket-info.css` to `/blue/basket-info.css`

3. Also prefix the URLs in the server, e.g., in blue you change `app.use(express.static("public"));` to `app.use("/blue", express.static("public"));`

4. Keep in mind to migrate URLs for use outside of the MF, too, for instance change ``res.redirect(`/buy-button?sku=${sku}`);`` to ``res.redirect(`http://localhost:1234/red/product-page?sku=${sku}`);``

5. Create a new directory for the edge-side service

6. Fill it with a Dockerfile using the `nginx:latest` image containing a local *nginx.conf* configuration file

7. In the server have a section for each MF, e.g., for the red micro frontend you should have

```
location /red {
    ssi on;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-NginX-Proxy true;
    proxy_pass http://host.docker.internal:2001;
    proxy_ssl_session_reuse off;
    proxy_set_header Host $http_host;
    proxy_cache_bypass $http_upgrade;
    proxy_redirect off;
}
```

Change the URLs of the MFs respectively. In the sample we refer to `host.docker.internal` to access `localhost` from the Docker container.

8. Modify the used ESI tags with SSI, e.g., in the red micro frontend replace

```html
<esi:include src="/mf-blue/buy-button?sku=<%= current.sku %>" />
```

with

```html
<!--# include virtual="/blue/buy-button?sku=<%= current.sku %>" -->
```

9. Extend the fragment in the red MF to be a full HTML document
