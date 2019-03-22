const feedServices = require("./services/feedServices");

const express = require("express");

const router = express.Router();

//#region feed controller
router.post("/feed", (req, res) => {
    feedServices
      .insertPost(req.body)
      .then(response => {
        res.json(response);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  });
  
  router.get("/feed", (req, res) => {
    feedServices
      .getFeed()
      .then(response => {
        rses.json(response);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  });
  
  router.get(`/post/:id`, (req, res) => {
    feedServices
      .getPost(req.params.id)
      .then(response => {
        res.json(response);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  });
  
  router.delete(`/post/:id/delete`, (req, res) => {
    feedServices
      .deletePost(req.params.id)
      .then(response => {
        res.json(response);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  });
  
  //#endregion