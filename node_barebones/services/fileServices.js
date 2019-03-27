const sql = require("mssql");
const { poolPromise } = require("../connectionPool");
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

AWS.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID
});

const s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "sabio-s3",
    metadata: (req, file, cb) => {
      cb(null, {
        fileUrl: file.fileUrl,
        fileType: file.fileType
      });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString());
    }
  })
});

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

module.exports = { upload, storeFile };
