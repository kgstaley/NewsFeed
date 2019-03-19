// this is where router logic goes
const express = require("express"); // put controller routes here
// const birdsController = require("./controllers/birds")


const router = express.Router(); // set up routing below

router.get("/", (req, res) => {
  res.send("User registration");
});
router.get("/login", (req, res) => {
  res.send("User login");
});
module.exports = router;
//# sourceMappingURL=index.js.map