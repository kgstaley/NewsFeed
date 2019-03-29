const express = require("express");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");

const router = express.Router();

const userServices = require("../services/userServices");

router.post("/register", (req, res) => {
  userServices
    .insertUser(req.body)
    .then(() => {
      const token = jwt.sign(
        { id: req.body.username + uuid.v4() },
        process.env.TOKEN_SECRET,
        { expiresIn: 86400 }
      );
      // send the auth token back
      res.status(200).send({ auth: true, token: token });
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.post(`/login`, (req, res) => {
  userServices
    .login(req.body)
    .then(() => {
      const token = jwt.sign(
        { id: req.body.username + uuid.v4() },
        process.env.TOKEN_SECRET,
        { expiresIn: 86400 }
      );
      // send the auth token back on success
      res.status(200).send({ auth: true, token: token });
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

router.get("/", (req, res) => {
  userServices
    .getUsers()
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.get(`/:id`, (req, res) => {
  userServices
    .getUser(req.params.id)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.put(`/:id/edit`, (req, res) => {
  userServices
    .updateUser(req.body)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.delete(`/:id/delete`, (req, res) => {
  userServices
    .deleteUser(req.params.id)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

module.exports = router;
