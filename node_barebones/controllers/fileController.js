const express = require("express");
const router = express.Router();
const IncomingForm = require("formidable").IncomingForm;

const fs = require("fs");

const fileService = require("../services/fileServices");
const AWS = require("aws-sdk");
const mime = require("mime-types");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

router.post("/", (req, res) => {
  const form = new IncomingForm(); 
  form.multiples = true; 

  form.on("file", (filed, file)=> {
    let fileName = ""; 
    let buffer = null; 

    buffer = fs.readFileSync(file.path);
    fileName = file.name;

    let upload = {}; 
    upload.userId = req.user.id;
    upload.fileName = fileName; 

    const type = mime.contentType(fileName);
    upload.fileType = type; 

    let key = `newsfeed` 
  })


  fileService
    .uploadFile(req.body)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

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

module.exports = router;
