const express = require("express");
const app = express();
const userServices = require("./services/userServices");
const port = 8080;

app.post("/register", (req, res) => {
  // insert userService
  userServices
    .insertUser(req.body)
    .then(res => {
      res.json(res);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.post("/", (req, res) => {
  // insert feedService
});

app.get("/home", (req, res) => {
  userServices
    .getUsers()
    .then(res => {
      res.json(res);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
