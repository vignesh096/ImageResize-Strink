const express = require("express");
const path = require("node:path");
const port = 3344;
const app = express();

app.use(express.static(path.join(__dirname, "../Public")));
app.use(express.static(path.join(__dirname, "../Staff")));

app.use("/", (req, res) => {
  res.sendFile("index.html");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
