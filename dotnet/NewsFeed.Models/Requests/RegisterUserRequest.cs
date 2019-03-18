using System;
using System.Collections.Generic;
using System.Text;

namespace NewsFeed.Models.Requests
{
    public class RegisterUserRequest
    {
        public string Username { get; set }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}