const express = require("express");
const app = express();
const userServices = require("./services/userServices");

app.post("/register", (req, res) => {
  // insert userService
  userServices.insertUser(req.body).then(res => {
    res.json(body).catch(err => {
      res.status(500).send(err);
    });
  });
});

app.post("/", (req, res) => {
  // insert feedService
});
