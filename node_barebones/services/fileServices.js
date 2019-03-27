const sql = require("mssql");
const { poolPromise } = require("../connectionPool");
const AWS = require("aws-sdk");
const mime = require("mime-types");

const uploadFile = (key, file, url) => {
  const s3 = new AWS.S3();
  const type = mime.contentType(key);

  const payload = {
    Bucket: "sabio-s3",
    Key: url,
    Body: file,
    ContentType: type
  };

  return new Promise((resolve, reject) => {
    s3.putObject(payload, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(payload.Key);
    });
  });
};

const storeFile = file => {
  return new Promise((resolve, reject) => {
    return poolPromise.then(pool => {
      return pool
        .request()
        .input("UserId", sql.Int, file.userId)
        .input("FileUrl", sql.NVarChar, file.fileUrl)
        .input("FileName", sql.NVarChar, file.fileName)
        .input("FileType", sql.NVarChar, file.fileType)
        .output("Id", sql.Int)
        .execute("dbo.Files_Insert", (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        })
        .then(sql.close)
        .catch(err => {
          reject(err);
        });
    });
  });
};

module.exports = { uploadFile, storeFile };
