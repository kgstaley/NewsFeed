const sql = require("mssql");

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
          .input("Password", sql.NVarChar(MAX), data.password)
          .output("Id", sql.Int)
          .execute("dbo.Users_Insert");
      })
      .then(result => {
        resolve(result);
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports = { insertUser };
