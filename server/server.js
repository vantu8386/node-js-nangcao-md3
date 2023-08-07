const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const port = 3000;

const usersRouter = require("./routers/users.router");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(morgan("dev"));
app.use(cors());

app.use("/api/v1/users", usersRouter);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
