const express = require("express");
const { json, urlencoded } = require("body-parser");
const cookieParser = require("cookie-parser");
const { config } = require("dotenv");
const helmet = require("helmet");
const routes = require("./routes");
const Responses = require("newsfeed=web-models").Responses;

const app = express();
var createError = require("http-errors");
var cors = require("cors");
const http = require("http").Server(app);

var debugRoute;
var debugRoutes = [];
var debugRouteInfo = [];

config();

const port = process.env.PORT || 8080;
const _isDebugEnv = process.env.SHOW_ROUTES === "true";

app.use(cors({ credentials: true, origin: true }));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());

let apiPrefix = process.env.API_PREFIX || "";
debugRouteInfo.push("server apiPrefix:", apiPrefix);
