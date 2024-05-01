const tar = require("tar");
const { createGunzip } = require("zlib");
const { dirname, basename } = require("path");

const packageRoot = "package/";

function getPackageJson(files) {
  const fileName = `${packageRoot}package.json`;
  const fileContent = files[fileName];
  const content = fileContent.toString("utf8");
  return JSON.parse(content);
}

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

function extractMetadata(data, file, rootUrl) {
  return {
    name: data.name,
    version: data.version,
    link: `${rootUrl}/files/${data.name}/${data.version}/${file}`,
  };
}

function untar(stream) {
  return new Promise((resolve, reject) => {
    const files = {};
    stream
      .on("error", reject)
      .pipe(createGunzip())
      .on("error", reject)
      .pipe(new tar.Parse())
      .on("error", reject)
      .on("entry", (e) => {
        const content = [];
        const p = e.path;

        e.on("error", reject);
        e.on("data", (c) => content.push(c));
        e.on("end", () => (files[p] = Buffer.concat(content)));
      })
      .on("end", () => resolve(files));
  });
}

exports.getModuleContent = (stream, rootUrl) =>
  untar(stream).then((files) => {
    const data = getPackageJson(files);
    const path = getMainPath(data, files);
    const root = dirname(path);
    const file = basename(path);
    const meta = extractMetadata(data, file, rootUrl);
    return {
      meta,
      root,
      files,
    };
  });
