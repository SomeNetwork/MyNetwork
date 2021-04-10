require("dotenv").config({ path: "./.env.local" });
require("dotenv").config();
const { createServer } = require("https");
const { parse } = require("url");
const next = require("next");
const fs = require("fs");
const port = 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev: false });
const handle = app.getRequestHandler();

console.log(`process.env`, process.env);
const httpsConfig = {
  key: fs.readFileSync(process.env.SSL_KEY),
  //   key: fs.readFileSync("../ssl/dev.localhost.key"),
  cert: fs.readFileSync(process.env.SSL_CRT),
  //   cert: fs.readFileSync("../ssl/dev.localhost.crt"),
};

app.prepare().then(() => {
  createServer(httpsConfig, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(process.env.HTTPS_PORT || port, (err) => {
    if (err) throw err;
    console.log(
      "ready - started server on port:" + process.env.HTTPS_PORT || port
    );
  });
});
