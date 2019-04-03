using System;
using System.Collections.Generic;
using System.Text;

namespace NewsFeed.Models.Requests
{
    public class UserAddRequest
    {
        public string Username { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}