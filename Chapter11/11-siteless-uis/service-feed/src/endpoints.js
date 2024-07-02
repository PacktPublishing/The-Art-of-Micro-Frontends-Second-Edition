const { join, relative, sep } = require("path");
const { lookup } = require("mime-types");
const { getModuleData, getModules, setModuleData } = require("./db");
const { getModuleContent } = require("./modules");

exports.getFiles = () => async (req, res) => {
  const { name, version, org, file } = req.params;
  const id = org ? `@${org}/${name}` : name;
  const moduleData = await getModuleData(id, version);

  if (!moduleData) {
    res.status(404).send("Module not found!");
  } else if (file) {
    const path = join(moduleData.root, file).split(sep).join("/");
    const content = Buffer.from(moduleData.files[path]);

    if (content) {
      const tenYears = 24 * 60 * 60 * 365 * 10;

      res
        .header("Cache-Control", `public, max-age=${tenYears}`)
        .contentType(lookup(file) || "application/octet-stream")
        .status(200)
        .send(content);
    } else {
      res.status(404).send("File not found!");
    }
  } else {
    const files = Object.keys(moduleData.files)
      .map((m) => relative(moduleData.root, m))
      .filter((m) => m.indexOf(sep) === -1);

    res.status(200).json(files);
  }
};

exports.getLatestModules = () => async (_, res) => {
  const modules = await getModules();
  const unique = modules.reduce((prev, curr) => {
    prev[curr.meta.name] = curr.meta;
    return prev;
  }, {});
  const items = Object.keys(unique).map((name) => unique[name]);
  return res.json(items);
};

exports.publishModule = (rootUrl) => (req, res) => {
  const bb = req.busboy;

  if (bb) {
    req.pipe(bb);

    bb.on("file", async (_, file) => {
      try {
        const content = await getModuleContent(file, rootUrl);
        await setModuleData(content);
        res.status(200).json({});
      } catch (err) {
        res.status(400).json({
          message: err.message,
        });
      }
    });
  } else {
    res.status(400).json({
      message: "Missing file upload.",
    });
  }
};
