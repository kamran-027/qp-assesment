import { PrismaClient } from "@prisma/client";
import express from "express";

export const userRouter = express.Router();
const prisma = new PrismaClient();

userRouter.get("/checkItems", async (req, res) => {
  try {
    const allItems = await prisma.item.findMany({
      where: {
        quantity: {
          gt: 0,
        },
      },
    });

    res.json({
      items: allItems,
    });
  } catch (error) {
    res.json({
      error: error,
    });
  }
});

userRouter.post("/buyItems", async (req, res) => {
  const itemsToBuy = req.body;

  try {
    itemsToBuy.map(async (item: any) => {
      await prisma.item.update({
        where: {
          id: item.id,
        },
        data: {
          quantity: {
            decrement: Number(item.quantity),
          },
        },
      });
    });

    res.json({
      message: `Items bought successfully!`,
    });
  } catch (error) {
    res.json({
      error: error,
    });
  }
});
