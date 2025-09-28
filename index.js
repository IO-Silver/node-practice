const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const express = require("express");
const morgan = require("morgan");
const config = require("config");
const helmet = require("helmet");
const logger = require("./logger");
const courses = require("./routes/courses");
const home = require("./routes/home");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use(morgan("tiny"));
app.use(logger);

mongoose
  .connect("mongodb://localhost/mongo-exercises")
  .then(() => dbDebugger("Connected to MongoDB..."))
  .catch((err) => dbDebugger("Could not connect to MongoDB...", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  price: Number,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const pageNumber = 1;
const pageSize = 10;
const Course = mongoose.model("Course", courseSchema);

async function getCourses(id) {
  const course = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: "Rio",
      },
    },
    { new: true }
  );
  if (!course) return;
  course.set({
    isPublished: true,
    author: "Another Author",
  });
  const result = await course.save();
  console.log(courses);
}

getCourses();

app.set("view engine", "pug");
app.set("views", "./views");

startupDebugger("Application Name: " + config.get("name"));

app.use("/api/courses", courses);
app.use("/", home);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
