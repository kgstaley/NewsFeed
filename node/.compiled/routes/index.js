// this is where router logic goes
const express = require("express"); // put controller routes here
// const birdsController = require("./controllers/birds")


const router = express.Router(); // set up routing below

router.get("/", (req, res) => {
  res.send("Landing page");
});
router.post("/login", (req, res) => {
  res.send("User login");
});
router.post("/register", (req, res) => {
  res.send("User registration");
});
module.exports = router;
//# sourceMappingURL=index.js.map