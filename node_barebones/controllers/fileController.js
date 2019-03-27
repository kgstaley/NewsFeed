const express = require("express");
const router = express.Router();

const fileService = require("../services/fileServices");

const singleUpload = fileService.upload.single("image");

router.post("/upload-image", (req, res) => {
  singleUpload(req, res)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

module.exports = router;
