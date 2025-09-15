const startupDebugger = require("debug")("app:startup");
const express = require("express");
const morgan = require("morgan");
const config = require("config");
const helmet = require("helmet");
const logger = require("./logger");
const courses = require("./routes/courses");
const home = require("./routes/home");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use(morgan("tiny"));
app.use(logger);

app.set("view engine", "pug");
app.set("views", "./views");

startupDebugger("Application Name: " + config.get("name"));

app.use("/api/courses", courses);
app.use("/", home);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
