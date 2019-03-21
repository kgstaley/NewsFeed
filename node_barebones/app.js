const express = require("express");
const app = express();
const userServices = require("./services/userServices");
const feedServices = require("./services/feedServices");
const cors = require("cors");
const port = 8080;

app.use(express.json());
app.use(cors({ credentials: true, origin: true }));
app.use(express.urlencoded({ extended: false }));

//#region user controller
app.post("/register", (req, res) => {
  userServices
    .insertUser(req.body)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.get("/users", (req, res) => {
  userServices
    .getUsers()
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.get(`/user/:id`, (req, res) => {
  userServices
    .getUser(req)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.put(`/user/:id/edit`, (req, res) => {
  userServices
    .updateUser(req)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.delete(`/user/:id/delete`, (req, res) => {
  userServices
    .deleteUser(req)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

//#endregion

//#region feed controller
app.post("/feed", (req, res) => {
  feedServices
    .insertPost(req.body)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.get("/feed", (req, res) => {
  feedServices
    .getFeed()
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.get(`/post/:id`, (req, res) => {
  feedServices
    .getPost(req)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.delete(`/post/:id/delete`, (req, res) => {
  feedServices
    .deletePost(req)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

//#endregion

app.listen(port, () => console.log(`Listening on port ${port}`));
