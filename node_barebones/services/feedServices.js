const sql = require("mssql");
const { poolPromise } = require("../connectionPool");

const insertPost = data => {
  console.log(data);
  return new Promise((resolve, reject) => {
    return poolPromise
      .then(pool => {
        return pool
          .request()
          .input("Body", sql.NVarChar(140), data.body)
          .input("CreatedBy", sql.Int, data.createdBy)
          .output("Id", sql.Int)
          .execute("dbo.Feeds_Insert", (err, result) => {
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

const getFeed = () => {
  return new Promise((resolve, reject) => {
    return poolPromise
      .then(pool => {
        return pool.request().execute("dbo.Feeds_SelectAll", (err, result) => {
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

const getPost = id => {
  console.log(id);
  return new Promise((resolve, reject) => {
    return poolPromise
      .then(pool => {
        return pool
          .request()
          .input("Id", sql.Int, id)
          .execute("dbo.Feeds_SelectById", (err, result) => {
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

const updatePost = payload => {
  console.log(payload);
  return new Promise((resolve, reject) => {
    return poolPromise
      .then(pool => {
        return pool
          .request()
          .input("Id", sql.Int, payload.id)
          .input("Body", sql.NVarChar(140), payload.body)
          .execute("dbo.Feeds_Update", (err, result) => {
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

const deletePost = id => {
  console.log(id);
  return new Promise((resolve, reject) => {
    return poolPromise
      .then(pool => {
        return pool
          .request()
          .input("Id", sql.Int, id)
          .execute("dbo.Feeds_Delete", (err, result) => {
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

module.exports = { insertPost, getFeed, getPost, deletePost, updatePost };
