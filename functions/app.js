import "./database.js";

import express from "express";

export const app = express();

app.use(express.json());

app.get("/api/hello", (req, res) => {
  res.send({ message: "Hello World!" });
});
