const sql = require("mssql");
const bcrypt = require("bcrypt");
const { poolPromise } = require("../connectionPool");
const saltRounds = 10;

const insertUser = data => {
  console.log(data);
  return new Promise((resolve, reject) => {
    const hashedPw = bcrypt.hashSync(data.password, saltRounds);
    return poolPromise
      .then(pool => {
        pool
          .request()
          .input("Username", sql.NVarChar(50), data.username)
          .input("Firstname", sql.NVarChar(50), data.firstname)
          .input("Lastname", sql.NVarChar(50), data.lastname)
          .input("Email", sql.NVarChar(100), data.email)
          .input("Password", sql.NVarChar(100), hashedPw)
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

const login = data => {
  console.log(data);
  let comparePW = false;
  return new Promise((resolve, reject) => {
    return poolPromise
      .then(pool => {
        pool
          .request()
          .input("Username", sql.NVarChar(50), data.username)
          .execute("dbo.Users_Login", (err, result) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(result);
            comparePW = bcrypt.compareSync(
              data.password,
              result.recordset[0].Password
            );
            if (comparePW) {
              console.log(`log the user in.`);
            } else {
              console.log(`Failed to authenticate user.`);
              return;
            }
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
  return new Promise((resolve, reject) => {
    return poolPromise
      .then(pool => {
        return pool
          .request()
          .input("Id", sql.Int, id)
          .execute("dbo.Users_SelectById", (err, result) => {
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
          .input("Id", sql.Int, payload.Id)
          .input("Username", sql.NVarChar(50), payload.Username)
          .input("Firstname", sql.NVarChar(50), payload.Firstname)
          .input("Lastname", sql.NVarChar(50), payload.Lastname)
          .input("Email", sql.NVarChar(100), payload.Email)
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

module.exports = {
  insertUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  login
};
