module.exports = {
  env: {
    API_PATH: process.env.API_PATH || "http://dev.localhost:3030",
    WS_PATH: process.env.WS_PATH || "wss://dev.localhost:3030",
    reactStrictMode: true,
  },
};
