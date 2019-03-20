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
          .input("CreatedBy", sql.Int, data.id)
          .execute("dbo.Feeds_Insert");
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

const getFeed = () => {
  return new Promise((resolve, reject) => {
    return poolPromise
      .then(pool => {
        return pool.request().execute("dbo.Feeds_SelectAll");
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

const getPost = id => {
  console.log(id);
  return new Promise((resolve, reject) => {
    return poolPromise
      .then(pool => {
        return pool
          .request()
          .input("Id", sql.Int, id)
          .execute("dbo.Feeds_SelectById");
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

const deletePost = id => {
  console.log(id);
  return new Promise((resolve, reject) => {
    return poolPromise
      .then(pool => {
        return pool
          .request()
          .input("Id", sql.Int, id)
          .execute("dbo.Feeds_Delete");
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

module.exports = { insertPost, getFeed, getPost, deletePost };
