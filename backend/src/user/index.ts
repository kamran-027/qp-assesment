import { Item, PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";
import { buyItemType } from "../models/model";

export const userRouter = Router();
const prisma = new PrismaClient();

userRouter.get("/checkItems", async (req: Request, res: Response) => {
  try {
    const allItems = await prisma.item.findMany({
      where: {
        quantity: {
          gt: 0,
        },
      },
    });

    return res.status(200).json({
      items: allItems,
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }
});

userRouter.post("/buyItems", async (req: Request, res: Response) => {
  const itemsToBuy = req.body;
  const { success } = buyItemType.safeParse(itemsToBuy);

  if (!success) {
    return res.status(400).json({
      message: `Check inputs again`,
    });
  }

  try {
    await Promise.all(
      itemsToBuy.map((item: Item) =>
        prisma.item.update({
          where: {
            name: item.name,
          },
          data: { quantity: { decrement: item.quantity } },
        })
      )
    );

    return res.status(200).json({
      message: `Items bought successfully!`,
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }
});
