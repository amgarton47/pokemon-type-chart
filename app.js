const path = require("path");
const morgan = require("morgan");
const express = require("express");

const port = 3000;
const app = express();
app.use(express.static("public"));
app.use(morgan("dev"));

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(process.env.PORT || port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
