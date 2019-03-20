const sql = require("mssql");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const config =
  "SQL_ConnectionString=Data Source=.;Initial Catalog=NewsFeed;Trusted_Connection=True;";

const bcryptPw = password => {
  bcrypt.hash(password, saltRounds).then(hash => {
    return hash;
  });
};

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
      })
      .catch(err => {
        reject(err);
      });
    sql.close();
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
      })
      .catch(err => {
        reject(err);
      });
    sql.close();
  });
};

const getUser = id => {
  console.log(id);
  return new Promise((resolve, reject) => {
    sql
      .connect(config)
      .then(pool => {
        return pool.request().execute("dbo.Users_SelectById");
      })
      .then(result => {
        resolve(result);
      })
      .catch(err => {
        reject(err);
      });
    sql.close();
  });
};

const updateUser = payload => {
  console.log(payload);
  return new Promise((resolve, reject) => {
    sql
      .connect(config)
      .then(pool => {
        return pool
          .request()
          .input("Id", sql.Int, payload.id)
          .input("Username", sql.NVarChar(50), payload.username)
          .input("Firstname", sql.NVarChar(50), payload.firstname)
          .input("Lastname", sql.NVarChar(50), payload.lastname)
          .input("Email", sql.NVarChar(100), payload.email)
          .execute("dbo.Users_Update");
      })
      .then(result => {
        resolve(result);
      })
      .catch(err => {
        reject(err);
      });
    sql.close();
  });
};

const deleteUser = id => {
  console.log(id);
  return new Promise((resolve, reject) => {
    sql
      .connect(config)
      .then(pool => {
        return pool
          .request()
          .input("Id", sql.Int, id)
          .execute("dbo.Users_Delete");
      })
      .then(result => {
        resolve(result);
      })
      .catch(err => {
        reject(err);
      });
    sql.close();
  });
};

module.exports = { insertUser, getUsers, getUser, updateUser, deleteUser };
