const express = require("express");
const server = express();

const cors = require("cors");
const port = 8080;

server.use(express.json());
server.use(cors({ credentials: true, origin: true }));
server.use(express.urlencoded({ extended: false }));

const routes = require("./routes");
routes.use(server);

server.listen(port, () => console.log(`Listening on port ${port}`));
