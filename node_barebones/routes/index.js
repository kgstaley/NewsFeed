const express = require("express");
const feedController = require("../controllers/feedController");
const userController = require("../controllers/userController");
const fileController = require("../controllers/fileController")

const router = express.Router();

router.use(`/feed`, feedController);
router.use(`/users`, userController);
router.use(`/files`, fileController);

module.exports = router;
