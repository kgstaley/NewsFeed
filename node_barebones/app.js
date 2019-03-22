const express = require("express");
const app = express();

const cors = require("cors");
const port = 8080;

app.use(express.json());
app.use(cors({ credentials: true, origin: true }));
app.use(express.urlencoded({ extended: false }));
app.use("/api", require("./routes/index").router);

app.listen(port, () => console.log(`Listening on port ${port}`));
