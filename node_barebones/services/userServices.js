const sql = require("mssql");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const config =
  "SQL_ConnectionString=Data Source=.;Initial Catalog=NewsFeed;Trusted_Connection=True;";

const insertUser = data => {
  console.log(data);
  return new Promise((resolve, reject) => {
    sql
      .connect(config)
      .then(pool => {
        return pool
          .request()
          .input("Username", sql.NVarChar(50), data.username)
          .input("Firstname", sql.NVarChar(50), data.firstname)
          .input("Lastname", sql.NVarChar(50), data.lastname)
          .input("Email", sql.NVarChar(100), data.email)
          .input("Password", sql.NVarChar(MAX), bcryptPw(data.password))
          .output("Id", sql.Int)
          .execute("dbo.Users_Insert");
      })
      .then(result => {
        resolve(result);
        sql.close();
      })
      .catch(err => {
        reject(err);
      });
    sql.close();
  });
};

const bcryptPw = password => {
  bcrypt.hash(password, saltRounds).then(hash => {
    return hash;
  });
};

const getUsers = () => {
  console.log(`Fetching all users`);
  return new Promise((resolve, reject) => {
    sql
      .connect(config)
      .then(pool => {
        return pool.request().execute("dbo.Users_SelectAll");
      })
      .then(result => {
        resolve(result);
        sql.close();
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports = { insertUser, getUsers };
