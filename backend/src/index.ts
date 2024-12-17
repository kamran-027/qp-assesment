import { PrismaClient } from "@prisma/client";
import express from "express";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Working alright check that" });
});

app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});
