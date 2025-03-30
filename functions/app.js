import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import qrcode from "qrcode";

export const app = express();

dotenv.config();

app.use(express.json());

app.get("/api/hello", (req, res) => {
  res.send({ message: "Hello World!" });
});

app.get("/api/qrcode", async (req, res) => {
  try {
    if (!req.query.text) {
      return res.send({ message: "Text is required!" });
    }

    const qrCodeImage = await qrcode.toBuffer(req.query.text, {
      scale: 15,
    });

    res.setHeader("Content-Type", "image/png");
    res.send(qrCodeImage);
  } catch (error) {
    console.error("Failed to generate QR", error);
    res.send({ message: "Failed to generate QR!", error });
  }
});

if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Successfully connected to mongodb!");
    })
    .catch((error) => {
      console.error("Failed to connect to mongodb!", error);
    });
} else {
  console.warn("MONGO_URI is not set!");
}
