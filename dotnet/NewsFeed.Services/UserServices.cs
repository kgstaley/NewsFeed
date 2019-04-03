using NewsFeed.Data.Providers;
using NewsFeed.Models.Requests;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;
using System.Data;
using NewsFeed.Models.Domains;
using BCrypt;

namespace NewsFeed.Services
{
    public class UserServices
    {
        private readonly IDataProvider _dataProvider;

        public UserServices(IDataProvider dataProvider)
        {
            _dataProvider = dataProvider;
        }

        public int RegisterUser(UserAddRequest userReq)
        {
            int userId = 0;
            string hashedPwd = BCryptHelper.HashPassword(userReq.Password, BCryptHelper.GenerateSalt());

            _dataProvider.ExecuteNonQuery("dbo.Users_Insert", (parameters) =>
            {
                SqlParameter param = new SqlParameter();
                param.ParameterName = "@Id";
                param.SqlDbType = SqlDbType.Int;
                param.Direction = ParameterDirection.Output;

                parameters.AddWithValue("@Username", userReq.Username);
                parameters.AddWithValue("@Firstname", userReq.Firstname);
                parameters.AddWithValue("@Lastname", userReq.Lastname);
                parameters.AddWithValue("@Email", userReq.Email);
                parameters.AddWithValue("@Password", hashedPwd);
            }, (returnParams) =>
            {
                userId = (int)returnParams["@Id"].Value;
            });

            return userId;
        }

        //public bool Login(User userInput)
        //{
        //    bool ValidatedPwd = false;
        //    _dataProvider.ExecuteCmd("dbo.Users_Login", (parameters) =>
        //    {
        //        parameters.AddWithValue("@Username", userInput.Username);
        //    },
        //    (reader, shortSetIndex) =>
        //    {
        //        User user = Mapper(reader);
        //        ValidatedPwd = BCryptHelper.CheckPassword(userInput.Password, user.Password);
        //        if (ValidatedPwd)
        //        {
        //            _authenticationService.LogIn(user);
        //        }
        //    });

        //    return ValidatedPwd;
        //}

        private User Mapper(IDataReader reader)
        {
            User dbUser = new User();
            dbUser.Id = (int)reader["Id"];
            dbUser.Username = reader["Username"] as string;
            dbUser.FirstName = reader["Firstname"] as string;
            dbUser.LastName = reader["Lastname"] as string;
            dbUser.Email = reader["Email"] as string;
            dbUser.Password = reader["Password"] as string;

            return dbUser;
        }
    }
}