import "./database.js";

import express from "express";
import qrcode from "qrcode";

export const app = express();

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
  }
});
