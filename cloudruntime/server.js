const express = require("express");
const cors = require("cors");

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT ERROR:", err);
});
process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED PROMISE:", err);
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cloud = require("./api/runtime/cloud");

app.post("/api/runtime/cloud", cloud);

app.listen(3000, () => {
  console.log("CloudRuntime running at http://localhost:3000/api/runtime/cloud");
});

