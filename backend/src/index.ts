import express from "express";
import { adminRouter } from "./admin";
import { userRouter } from "./user";
import cors from "cors";

const app = express();

app.use(express.json());

app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use(
  cors({
    origin: "*",
  })
);

app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});
