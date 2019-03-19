const Responses = require("sabio-web-models").Responses;
const BaseController = require("../BaseController");
const userService = require("sabio-services").userService;
var validate = require("uuid-validate");
// const _debug = logger.extend("user");
const { AllowAnonymous, RoutePrefix, Route } = require("sabio-routing");

@RoutePrefix("/api/users")
class TokenController extends BaseController {
  constructor() {
    super("UserController");
  }

  @AllowAnonymous()
  @Route("GET", "validate")
  getToken(req, res) {
    const requestToken = req.query.token;
    if (validate(requestToken) === true) {
      userService
        .getUserByToken(requestToken)
        .then(user => {
          // Database returns user roles as a comma-seperated string
          // split on roles to turn it into an array matching the .net cookie
          const userRoles = user.roles.split(",");

          const userRequest = {
            userId: user.id,
            userName: user.email,
            userRoles: userRoles,
            tenantId: ""
          };

          userService.getLoginToken(res, userRequest).then(data => {
            const sResponse = new Responses.SuccessResponse(data);
            res.json(sResponse);
          });
        })
        .catch(err => {
          console.log("getUserByToken failed");
          res.status(500).send(err);
        });
    } else {
      console.log("Token in URL was not a GUID - request failed");
      res.status(500);
    }
  }
}

module.exports = { controller: TokenController };
