import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";

export const adminRouter = express.Router();
const prisma = new PrismaClient();

adminRouter.get("/", (req, res) => {
  res.json({
    message: "This is admin router",
  });
});

adminRouter.post("/addItem", async (req, res) => {
  const newItemDetails = req.body;

  try {
    const newItem = await prisma.item.create({
      data: {
        name: newItemDetails.name,
        price: newItemDetails.price,
        quantity: newItemDetails.quantity,
      },
    });

    res.json({
      message: `${newItemDetails.quantity} units of ${newItem.name} is added to your invertory`,
    });
  } catch (error) {
    res.json({
      error: `Unable to add item, check error once ${error}`,
    });
  }
});

adminRouter.get("/getItems", async (req, res) => {
  try {
    const allItems = await prisma.item.findMany();

    res.json({
      items: allItems,
    });
  } catch (error) {
    res.json({
      error: `Error while fetching items ${error}`,
    });
  }
});

adminRouter.delete("/deleteItem/:id", async (req, res) => {
  const id = Number(req.params.id);

  try {
    await prisma.item.delete({
      where: {
        id: id,
      },
    });

    res.json({
      message: "Item deleted successfully!",
    });
  } catch (error) {
    res.json({
      error: `${error}`,
    });
  }
});

adminRouter.put("/updateItem/:id", async (req, res) => {
  const itemId = req.params.id;

  try {
    const udpatedItem = await prisma.item.update({
      where: {
        id: Number(itemId),
      },
      data: {
        name: req.body.name,
        price: req.body.price,
      },
    });

    res.json({
      message: `${udpatedItem.name} is updated`,
    });
  } catch (error) {
    res.json({
      error: `${error}`,
    });
  }
});

adminRouter.put("/updateQuantity/:id", async (req, res) => {
  const itemId = req.params.id;

  const newQuantity = req.body.quantity;

  if (newQuantity <= 0) {
    res.json({
      message: `Atleast add a single quantity to inventory`,
    });
  }

  try {
    const updatedItem = await prisma.item.update({
      where: {
        id: Number(itemId),
      },
      data: {
        quantity: {
          increment: Number(req.body.quantity),
        },
      },
      select: {
        quantity: true,
        name: true,
      },
    });

    res.json({
      message: `Updated count for ${updatedItem.name} is ${updatedItem.quantity}`,
    });
  } catch (error) {
    res.json({
      error: `Error while updating quanity, check error once ${error}`,
    });
  }
});
