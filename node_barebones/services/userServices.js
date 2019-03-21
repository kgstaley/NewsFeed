// const sql = require("mssql");
const bcrypt = require("bcrypt");
const { poolPromise } = require("../connectionPool");
const saltRounds = 10;
const sql = require("mssql");

const bcryptPw = password => {
  bcrypt.hash(password, saltRounds).then(hash => {
    return hash;
  });
};

const insertUser = data => {
  console.log(data);
  return new Promise((resolve, reject) => {
    const hashedPW = this.bcryptPw(data.password);
    return poolPromise
      .then(pool => {
        pool
          .request()
          .input("Username", sql.NVarChar(50), data.username)
          .input("Firstname", sql.NVarChar(50), data.firstname)
          .input("Lastname", sql.NVarChar(50), data.lastname)
          .input("Email", sql.NVarChar(100), data.email)
          .input("Password", sql.NVarChar(100), hashedPW)
          .output("Id", sql.Int)
          .execute("dbo.Users_Insert", (err, result) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(result.output);
          });
      })
      .then(sql.close)
      .catch(err => {
        reject(err);
      });
  });
};

const getUsers = () => {
  console.log(`Fetching all users`);
  return new Promise((resolve, reject) => {
    return poolPromise.then(pool => {
      pool
        .request()
        .execute("dbo.Users_SelectAll", (err, result) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(result);
        })
        .then(sql.close)
        .catch(err => reject(err));
    });
  });
};

const getUser = id => {
  console.log(id);
  return new Promise((resolve, reject) => {
    return poolPromise
      .then(pool => {
        return pool.request().execute("dbo.Users_SelectById", (err, result) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(result);
        });
      })
      .then(sql.close)
      .catch(err => {
        reject(err);
      });
  });
};

const updateUser = payload => {
  console.log(payload);
  return new Promise((resolve, reject) => {
    return poolPromise
      .then(pool => {
        return pool
          .request()
          .input("Id", sql.Int, payload.id)
          .input("Username", sql.NVarChar(50), payload.username)
          .input("Firstname", sql.NVarChar(50), payload.firstname)
          .input("Lastname", sql.NVarChar(50), payload.lastname)
          .input("Email", sql.NVarChar(100), payload.email)
          .execute("dbo.Users_Update", (err, result) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(result);
          });
      })
      .then(sql.close)
      .catch(err => {
        reject(err);
      });
  });
};

const deleteUser = id => {
  console.log(id);
  return new Promise((resolve, reject) => {
    return poolPromise
      .then(pool => {
        return pool
          .request()
          .input("Id", sql.Int, id)
          .execute("dbo.Users_Delete", (err, result) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(result);
          });
      })
      .then(sql.close)
      .catch(err => {
        reject(err);
      });
  });
};

module.exports = { insertUser, getUsers, getUser, updateUser, deleteUser };
