"use strict";

var express = require("express");

var _require = require("body-parser"),
    json = _require.json,
    urlencoded = _require.urlencoded;

var cookieParser = require("cookie-parser");

var _require2 = require("dotenv"),
    config = _require2.config;

var helmet = require("helmet");

var routes = require("./routes");

var Responses = require("sabio-web-models").Responses;

var app = express();

var createError = require("http-errors");

var cors = require("cors");

var http = require("http").Server(app); // eslint-disable-next-line no-unused-vars


var io = module.exports.io = require("socket.io")(http);

var debugRoute;
var debugRoutes = [];
var debugRouteInfo = [];
config();
var port = process.env.PORT || 8080; // DO NOT REMOVE THIS LINE!!!

var _isDebugEnv = process.env.SHOW_ROUTES === "true";

console.log("server port", port);
console.log("server _isDebugEnv", _isDebugEnv);
app.use(cors({
  credentials: true,
  origin: true
}));
app.use(json());
app.use(urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(helmet()); // for use within IIS
// app.use("/node-api/server.js/", routes);

var apiPrefix = process.env.API_PREFIX || "";
console.log("apiPrefix", apiPrefix);
debugRouteInfo.push("server apiPrefix:", apiPrefix);
app.use("/" + apiPrefix, routes);
app.use(function (req, res, next) {
  next(createError(404));
}); // error handler

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  var errorArr = [err.name + "[" + apiPrefix || "null" + "]", err.message, err.stack];

  if (_isDebugEnv) {
    errorArr = errorArr.concat(debugRouteInfo);
  }

  var errResponse = new Responses.ErrorResponse(errorArr);
  res.status(err.status || 500);
  res.json(errResponse);
});

if (typeof apiPrefix === "string") {
  apiPrefix = apiPrefix + "/";
}

app._server = http.listen(port, function () {
  var url = "listening on http://localhost:".concat(port, "/").concat(apiPrefix, "api/ping  {click here to ping}");
  console.log(url);
});

try {
  app._router.stack.forEach(function (middleware) {
    if (middleware.route) {
      // routes registered directly on the app
      debugRoutes.push(middleware.route);
    } else if (middleware.name === "router") {
      // router middleware
      middleware.handle.stack.forEach(function (handler) {
        debugRoute = handler.route;
        debugRoute && debugRoutes.push(debugRoute);
      });
    }
  });

  debugRoutes.forEach(function (temp) {
    var methods = "";

    for (var method in temp.methods) {
      methods += method + ", ";
    }

    debugRouteInfo.push(temp.path + ": " + methods);
  });
} catch (error) {
  console.error("Error with debug routes extraction", error);
}

module.exports = app;
//# sourceMappingURL=server.js.map