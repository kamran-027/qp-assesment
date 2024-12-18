import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";
import { itemInputObject, updateItemObject, updateItemQty, updateParamsId } from "../models/model";

export const adminRouter = Router();
const prisma = new PrismaClient();

adminRouter.post("/addItem", async (req: Request, res: Response) => {
  const newItemDetails = req.body;
  const { success } = itemInputObject.safeParse(newItemDetails);

  if (!success) {
    return res.status(400).json({
      message: `Check inputs again`,
    });
  }

  try {
    const newItem = await prisma.item.create({
      data: {
        name: newItemDetails.name,
        price: newItemDetails.price,
        quantity: newItemDetails.quantity,
      },
    });

    return res.status(201).json({
      message: `${newItemDetails.quantity} units of ${newItem.name} is added to your invertory`,
    });
  } catch (error) {
    return res.status(500).json({
      error: `Unable to add item, check error once ${error}`,
    });
  }
});

adminRouter.get("/getItems", async (req: Request, res: Response) => {
  try {
    const allItems = await prisma.item.findMany();

    return res.status(200).json({
      items: allItems,
    });
  } catch (error) {
    return res.status(500).json({
      error: `Error while fetching items ${error}`,
    });
  }
});

adminRouter.delete("/deleteItem/:id", async (req: Request, res: Response) => {
  const itemId = req.params.id;

  const { success: paramsSucess } = updateParamsId.safeParse(itemId);

  if (!paramsSucess) {
    return res.status(400).json({
      message: `Check the params passed`,
    });
  }

  try {
    await prisma.item.delete({
      where: {
        id: Number(itemId),
      },
    });

    return res.status(200).json({
      message: "Item deleted successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      error: `${error}`,
    });
  }
});

adminRouter.put("/updateItem/:id", async (req: Request, res: Response) => {
  const itemId = req.params.id;
  const newItemDetails = req.body;

  const { success: paramsSucess } = updateParamsId.safeParse(itemId);
  const { success: reqBodySucess } = updateItemObject.safeParse(newItemDetails);

  if (!paramsSucess || !reqBodySucess) {
    return res.status(400).json({
      message: `Check inputs or params passed`,
    });
  }

  try {
    const udpatedItem = await prisma.item.update({
      where: {
        id: Number(itemId),
      },
      data: {
        name: newItemDetails.name,
        price: newItemDetails.price,
      },
    });

    return res.status(201).json({
      message: `${udpatedItem.name} is updated`,
    });
  } catch (error) {
    return res.status(500).json({
      error: `${error}`,
    });
  }
});

adminRouter.put("/updateQuantity/:id", async (req: Request, res: Response) => {
  const itemId = req.params.id;
  const newQuantity = req.body.quantity;

  const { success: paramsSucess } = updateParamsId.safeParse(itemId);
  const { success: reqBodySucess } = updateItemQty.safeParse(newQuantity);

  if (!paramsSucess || !reqBodySucess) {
    return res.status(400).json({
      message: `Check inputs or params passed`,
    });
  }

  if (newQuantity <= 0) {
    return res.status(400).json({
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

    return res.status(201).json({
      message: `Updated count for ${updatedItem.name} is ${updatedItem.quantity}`,
    });
  } catch (error) {
    return res.status(500).json({
      error: `Error while updating quanity, check error once ${error}`,
    });
  }
});
