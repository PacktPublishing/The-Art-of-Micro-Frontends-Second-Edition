# Chapter 11

## Prerequisites

The following software is required to run the sample:

- Git
- Node.js
- npm

## Running

Go to the current directory and run NPM install:

```sh
npm install
```

Now start the application:

```sh
npm start
```

## Steps

Follow these steps to implement the same from scratch.

1. Initialize a new Node.js project and install the dependencies

```sh
npm init -y
npm install connect-busboy cors express mime-types pm2 tar --save
```

2. Start a new Express app and wire up the required middlewares

```js
app.use(
  cors({
    origin: "*",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(busboy());
```

3. Add at least 3 endpoints, one for getting modules, one for publishing modules, and one for getting the files of a published module:

```js
app.get("/modules", getLatestModules());
app.post("/modules", publishModule(host));
app.get("/files(/@:org)?/:name/:version/:file?", getFiles());
```

4. For simplicity in the sample the service works only against in memory data, i.e.,

```js
const modulesData = {};

exports.getModules = () => {
  const allModules = [];

  Object.keys(modulesData).forEach((name) =>
    Object.keys(modulesData[name]).forEach((version) => {
      allModules.push(modulesData[name][version]);
    })
  );

  return allModules;
};

exports.getModuleData = (name, version) => {
  const versions = modulesData[name] || {};
  return versions[version];
};

exports.setModuleData = (moduleData) => {
  const meta = moduleData.meta;
  const current = modulesData[meta.name] || {};
  modulesData[meta.name] = {
    ...current,
    [meta.version]: moduleData,
  };
};
```

5. When a module is published as a zipped tarball the file needs to be extracted and examined - the following pipeline helps

```js
exports.getModuleContent = (stream, rootUrl) =>
  untar(stream).then((files) => {
    const data = getPackageJson(files);
    const path = getMainPath(data, files);
    const root = dirname(path);
    const fileName = basename(path);
    const meta = extractMetadata(data, fileName, rootUrl);
    return {
      meta,
      root,
      files,
    };
  });
```

6. Especially finding the main path may be difficult, you can use an array sorted by preference:

```js
function getMainPath(data, files) {
  const paths = [
    data.main,
    `dist/${data.main}`,
    `${data.main}/index.js`,
    `dist/${data.main}/index.js`,
    "index.js",
    "dist/index.js",
  ];
  return paths
    .map((filePath) => `${packageRoot}${filePath}`)
    .filter((filePath) => !!files[filePath])[0];
}
```

7. Start the server with `node` leading to the entry point such as `node src/index.js`
