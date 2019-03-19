"use strict";

var _express = _interopRequireDefault(require("express"));

var _newsfeedWeb = _interopRequireDefault(require("newsfeed-web"));

var _path = _interopRequireDefault(require("path"));

var _newsfeedRouting = require("newsfeed-routing");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

var filters = _newsfeedWeb.default.Filters;
var routingOptions = {};

var pathToControllers = _path.default.join(__dirname, "/../controllers/"); // set handlers to bind user (usually only one)


routingOptions.userBinders = [filters.bindUser]; // these handlers will be used to authenticate the users (usually only one)

routingOptions.userAuthenticators = [filters.validateUser]; // these handlers will be used to validate the HTTP Body for endpoints that are marked for validation

routingOptions.bodyValidators = [filters.validateBody];
(0, _newsfeedRouting.mapRoutes)(router, pathToControllers, routingOptions);
module.exports = router;
//# sourceMappingURL=index.js.map