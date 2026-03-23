import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true });
});

const port = Number(process.env.PORT) || 5000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
