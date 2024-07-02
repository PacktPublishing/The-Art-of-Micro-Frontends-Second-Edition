const express = require("express");
const cors = require("cors");
const busboy = require("connect-busboy");

const { getFiles, publishModule, getLatestModules } = require("./endpoints");

const protocol = process.env.HTTPS ? "https" : "http";
const port = +(process.env.PORT || 9000);
const host = `${protocol}://localhost:${port}`;

const app = express();

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

app.get("/modules", getLatestModules());
app.post("/modules", publishModule(host));
app.get("/files(/@:org)?/:name/:version/:file?", getFiles());

app.listen(port, () => console.log(`Running at ${host}`));
