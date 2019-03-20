const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const userServices = require("./services/userServices");

app.post("/register", (req, res) => {
  // insert userService
  userServices.insertUser(req.body).then(res => {
    res.json(body);
  });
});

app.post("/", (req, res) => {
  // insert feedService
});
