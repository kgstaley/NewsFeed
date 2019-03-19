const express = require("express");

const routes = require("./routes");

const {
  json,
  urlencoded
} = require("body-parser");

const {
  config
} = require("dotenv");

const helmet = require("helmet");

const Responses = require("../newsfeed-modules/newsfeed-web-models/src/responses/").Responses;

const app = express();

var createError = require("http-errors");

var cors = require("cors");

const http = require("http").Server(app);

config();
app.use(cors({
  credentials: true,
  origin: true
}));
app.use(json());
app.use(urlencoded({
  extended: false
}));
app.use(helmet());
let apiPrefix = process.env.API_PREFIX || "";
app.use("/" + apiPrefix, routes);
app.use((req, res, next) => {
  next(createError(404));
});
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  let errorArr = [err.name + "[" + apiPrefix || "null" + "]", err.message, err.stack];
  let errResponse = new Responses.ErrorResponse(errorArr);
  res.status(err.status || 500);
  res.json(errResponse);
});

if (typeof apiPrefix === "string") {
  apiPrefix = apiPrefix + "/";
}

const port = 8080;
app._server = http.listen(port, () => {
  const url = `listening on http://localhost:${port}/${apiPrefix}api/ping`;
  console.log(url);
});
module.exports = app;
//# sourceMappingURL=server.js.map