const express = require("express");

const router = express.Router();

const userServices = require("./services/userServices");

//#region user controller
router.post("/register", (req, res) => {
  userServices
    .insertUser(req.body)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.get("/users", (req, res) => {
  userServices
    .getUsers()
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.get(`/user/:id`, (req, res) => {
  userServices
    .getUser(req.params.id)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.put(`/user/:id/edit`, (req, res) => {
  userServices
    .updateUser(req.body)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.delete(`/user/:id/delete`, (req, res) => {
  userServices
    .deleteUser(req.params.id)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

//#endregion

