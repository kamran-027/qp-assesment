import { PrismaClient } from "@prisma/client";
import express from "express";
import { adminRouter } from "./admin";
import { userRouter } from "./user";

const app = express();

app.use(express.json());

app.use("/admin", adminRouter);
app.use("/user", userRouter);

app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});
