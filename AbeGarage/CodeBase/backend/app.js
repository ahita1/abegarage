const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
port = parseInt(process.env.PORT);
const router = require("./routes");
app.use(router);
app.get("/", (req, res) => {
  res.send("Server is running!");
});
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
module.exports = app;
