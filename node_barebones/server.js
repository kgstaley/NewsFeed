const express = require("express");
const server = express();
const routes = require("./routes");

const cors = require("cors");
const port = 8080;

server.use(express.json());
server.use(cors({ credentials: true, origin: true }));
server.use(express.urlencoded({ extended: false }));

server.use(`/`, routes);

server.listen(port, () => console.log(`Listening on port ${port}`));
