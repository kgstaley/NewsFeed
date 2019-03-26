const express = require('express');
const router = express.Router();

const fileService = require("../services/fileServices");
const AWS = require("aws-sdk");
const mime = require("mime-types");


router.post("/", (req,res)=> {
    fileService.uploadFile(req.body).then(response=> {
        res.json(response);
    }).catch(err=> {
        res.status(500).send(err);
    })
})

const storeFile = (req,res)=> {
    console.log(req);
    fileService.storeFile(req.body).then(response=> {
        res.json(response);
    }).catch(err=> {
        res.status(500).send(err);
    })
}

module.exports = router;