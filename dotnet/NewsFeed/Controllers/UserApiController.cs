using Microsoft.AspNetCore.Mvc;
using NewsFeed.Models.Requests;
using NewsFeed.Services;
using Sabio.Web.Models.Responses;
using System;

namespace NewsFeed
{
    [Route("users")]
    [ApiController]
    public class UserApiController : ControllerBase
    {
        private readonly UserServices _userServices;

        public UserApiController(UserServices userServices)
        {
            _userServices = userServices;
        }

        [HttpPost("register")]
        public ActionResult<ItemResponse<int>> Register(UserAddRequest newUser)
        {
            ActionResult result = null;
            ItemResponse<int> response = null;

            try
            {
                int registeredUser = _userServices.RegisterUser(newUser);

                if (registeredUser > 0)
                {
                    response = new ItemResponse<int>();

                    response.Item = registeredUser;

                    result = Ok(response);
                }
                else
                {
                    result = StatusCode(400, new ErrorResponse("Failed to create a new user."));
                }
            }
            catch (Exception ex)
            {
                result = StatusCode(500, new ErrorResponse(ex.Message.ToString()));
            }

            return result;
        }
    }
}