const Responses = require("sabio-web-models").Responses;
const BaseController = require("../BaseController");
const usersService = require("sabio-services").usersService;
const { RoutePrefix, Route } = require("sabio-routing");

@RoutePrefix("/api/dashboard/customer")
class UsersController extends BaseController {
  constructor() {
    super("UsersController");
  }

  @Route("PUT", "")
  updateAvatar(req, res) {
    usersService
      .updateAvatar(req.body)
      .then(data => {
        const sResponse = new Responses.SuccessResponse(data);
        res.json(sResponse);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }
}

module.exports = { controller: UsersController };
