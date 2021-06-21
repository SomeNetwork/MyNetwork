require("dotenv").config({ path: "./.env.local" });
require("dotenv").config();
const https = require("https");
const http = require("http");
const { parse } = require("url");
const next = require("next");
const fs = require("fs");
const isDev = process.env.NODE_ENV === "dev";
const app = next({ dev: isDev });
const handle = app.getRequestHandler();

console.log(`process.env`, process.env);
const httpsConfig = {
  key: fs.readFileSync(process.env.SSL_KEY),
  //   key: fs.readFileSync("../ssl/dev.localhost.key"),
  cert: fs.readFileSync(process.env.SSL_CRT),
  //   cert: fs.readFileSync("../ssl/dev.localhost.crt"),
};

app.prepare().then(() => {
  https
    .createServer(httpsConfig, (req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    })
    .listen(process.env.HTTPS_PORT || 443, (err) => {
      if (err) throw err;
      console.log("https server on port:" + process.env.HTTPS_PORT || 443);
    });
  http
    .createServer((req, res) => {
        res.writeHead(302, {
          Location: "https://" + req.headers.host + req.url
        });
        res.end();
    })
    .listen(process.env.HTTP_PORT || 80, (err) => {
      if (err) throw err;
      console.log("http server on port:" + process.env.HTTP_PORT || 80);
    });
});
