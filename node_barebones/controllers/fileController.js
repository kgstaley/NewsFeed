const express = require("express");
const router = express.Router();

const IncomingForm = require("formidable").IncomingForm;
const fs = require("fs");
const uuid = require("uuid");

const fileService = require("../services/fileServices");
const AWS = require("aws-sdk");
const mime = require("mime-types");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

router.post("/upload", (req, res) => {
  const storeFile = (req, res) => {
    console.log(req);
    fileService
      .storeFile(req.body)
      .then(response => {
        res.json(response);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  };

  const promises = [];
  const form = new IncomingForm();
  form.multiples = true;

  form.on("file", (field, file) => {
    let fileName = "";
    let buffer = null;

    buffer = fs.readFileSync(file.path);
    fileName = file.name;

    let upload = {};
    upload.userId = req.user.id;
    upload.fileName = fileName;

    const type = mime.contentType(fileName);
    upload.fileType = type;

    let key = `newsfeed${uuid.v4()}-${fileName}`;
    upload.fileUrl = key;

    const uploadPromise = fileService
      .uploadFile(fileName, buffer, key)
      .then(() => fileService.storeFile(upload))
      .catch(err => {
        res.status(500).send(err);
      });
    promises.push(uploadPromise);
  });

  form.on("end", () => {
    Promise.all(promises)
      .then(values => {
        let urls = [];
        for (let i = 0; i <= values.length; i++) {
          urls.push(process.env.AWS_DOMAIN + values[i].file.fileUrl);
        }
      })
      .then(response => {
        res.json(response);
      });
  });
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log(err);
    }
  });
});

module.exports = router;
