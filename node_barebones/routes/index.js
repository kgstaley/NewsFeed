const express = require("express");
const feedController = require("../controllers/feedController");
const userController = require("../controllers/userController");

const router = express.Router();

router.use(`/feed`, feedController);
router.use(`/users`, userController);

module.exports = router;
