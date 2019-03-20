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

app.get(`/user/${id}`, (req, res) => {
  userServices
    .getUser(req)
    .then(res => {
      res.json(res);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.put(`/user/${id}/edit`, (req, res) => {
  userServices
    .updateUser(req.id)
    .then(res => {
      res.json(res);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.delete(`/user/${id}/delete`, (req, res) => {
  userServices
    .deleteUser(req)
    .then(res => {
      res.json(res);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

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

app.get("/feed", (req, res) => {
  feedServices
    .getFeed()
    .then(res => {
      res.json(res);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.get(`/post/${id}`, (req, res) => {
  feedServices
    .getPost(req)
    .then(res => {
      res.json(res);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.delete(`/post/${id}/delete`, (req, res) => {
  feedServices
    .deletePost(id)
    .then(res => {
      res.json(res);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

//#endregion

app.listen(port, () => console.log(`Listening on port ${port}`));
