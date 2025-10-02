const request = require("supertest");
const express = require("express");
const coursesRouter = require("./routes/courses");

let app;

beforeAll(() => {
  app = express();
  app.use(express.json());
  app.use("/api/courses", coursesRouter);
});

describe("GET /api/courses", () => {
  it("should return an array of courses", async () => {
    const res = await request(app).get("/api/courses");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe("POST /api/courses", () => {
  it("should create a new course and return it", async () => {
    const newCourse = { name: "Test Course", author: "Test Author" };
    const res = await request(app).post("/api/courses").send(newCourse);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("name", "Test Course");
    expect(res.body).toHaveProperty("author", "Test Author");
  });
});
