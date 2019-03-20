const express = require("express");
const app = express();
const userServices = require("./services/userServices");
const feedServices = require("./services/feedServices");
const port = 8080;

//#region user controller
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

app.get("/users", (req, res) => {
  userServices
    .getUsers()
    .then(res => {
      res.json(res);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.get(`/user/${id}`, (req, res) => {});

//#endregion

//#region feed controller
app.post("/feed", (req, res) => {
  // insert feedService
  feedServices
    .insertPost(req.body)
    .then(res => {
      res.json(res);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

//#endregion

app.listen(port, () => console.log(`Listening on port ${port}`));
