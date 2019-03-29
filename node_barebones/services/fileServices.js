const sql = require("mssql");
const { poolPromise } = require("../connectionPool");
const AWS = require("aws-sdk");
const mime = require("mime-types");

const upload = (key, file, url) => {
  const s3 = new AWS.S3();
  const type = mime.contentType(key);

  const params = {
    Bucket: "sabio-s3",
    Key: url,
    Body: file,
    ContentType: type
  };

  return new Promise((resolve, reject) => {
    s3.putObject(params, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(params.key);
    });
  });
};

const storeFile = file => {
  console.log(file);
  return new Promise((resolve, reject) => {
    return poolPromise
      .then(pool => {
        pool
          .request()
          .input("UserId", sql.Int, file.userId)
          .input("FileUrl", sql.NVarChar, file.fileUrl)
          .input("FileName", sql.NVarChar, file.fileName)
          .input("FileType", sql.NVarChar, file.fileType)
          .output("Id", sql.Int)
          .execute("dbo.Files_Insert", (err, result) => {
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

const getFiles = () => {
  return new Promise((resolve, reject) => {
    return poolPromise
      .then(pool => {
        pool.request().execute("dbo.Files_SelectAll", (err, result) => {
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

module.exports = { upload, storeFile, getFiles };
