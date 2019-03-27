const express = require("express");
const router = express.Router();
const AWS = require("aws-sdk");
const fs = require("fs");
const mime = require("mime-types");
const uuid = require("uuid");
const IncomingForm = require("formidable").IncomingForm;

const fileService = require("../services/fileServices");

AWS.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID
});

router.post("/upload-image", (req, res) => {
  const promises = [];
  const form = new IncomingForm();
  form.multiples = true;

  form.on("file", (field, file) => {
    let fileName = "";
    let buffer = null;

    buffer = fs.readFileSync(file.path);
    fileName = file.name;

    let upload = {};
    upload.userId = 22;
    upload.fileName = fileName;

    const type = mime.contentType(fileName);
    upload.fileType = type;

    let key = `newsfeed/` + uuid.v4() + `-` + fileName;
    upload.fileUrl = key;

    const uploadPromise = fileService
      .upload(fileName, buffer, key)
      .then(() => fileService.storeFile(upload))
      .catch(err => {
        throw err;
      });

    promises.push(uploadPromise);
  });

  form.on("end", () => {
    Promise.all(promises)
      .then(values => {
        let urls = [];
        for (let i = 0; i < values.length; i++) {
          urls.push(process.env.AWS_DOMAIN + values[i].file.fileUrl);
        }
      })
      .then(response => {
        res.json(response);
      })
      .catch(err => {
        throw err;
      });
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      throw err;
    }
  });
});

module.exports = router;
