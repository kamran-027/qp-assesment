import express from "express";

export const userRouter = express();

userRouter.get("/", (req, res) => {
  res.json({
    message: "This is user router",
  });
});
