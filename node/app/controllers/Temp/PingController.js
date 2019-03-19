const Responses = require("newsfeed-web-models").Responses;
const { AllowAnonymous, RoutePrefix, Route } = require("newsfeed-routing");
const BaseController = require("../BaseController");
const { logger } = require("../common");

const _debug = logger.extend("ping");
/*
  Only for sanity checks.

  You can probably remove everything out of here except the ping
   enpdoint to have at least 1 endpoint you know worked at some point All controllers must be a class that extends BaseController
*/
@RoutePrefix("/api/ping")
class PingController extends BaseController {
  constructor() {
    super("PingController");
  }
  @AllowAnonymous()
  @Route("GET", "")
  ping(req, res, next) {
    let sResponse = new Responses.ItemResponse({
      originalUrl: req.originalUrl,
      url: req.url
    });
    _debug("GET ping.......");
    res.json(sResponse);
  }

  @Route("GET", "items")
  getItems(req, res, next) {
    let sResponse = new Responses.ItemsResponse(["one", "two", "three"]);

    res.json(sResponse);
  }

  @Route("GET", "search")
  search(req, res, next) {
    let sResponse = new Responses.ItemResponse();
    let fromQuery = { terms: req.query.terms };

    sResponse.item = fromQuery;
    res.json(sResponse);
  }

  @Route("POST", "items")
  addItem(req, res, next) {
    let sResponse = new Responses.ItemResponse(99);

    res.status("201").json(sResponse);
  }

  @Route("PUT", "items")
  update(req, res, next) {
    let sResponse = new Responses.ItemResponse(req.params.id);

    res.json(sResponse);
  }
}

module.exports = { controller: PingController };
