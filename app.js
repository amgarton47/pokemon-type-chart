const path = require("path");
const express = require("express");

const port = 3000;
const app = express();
app.use(express.static("public"));

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(port || process.env.port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
