"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const client_1 = require("@prisma/client");
const express_1 = require("express");
const model_1 = require("../models/model");
exports.adminRouter = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
exports.adminRouter.post("/addItem", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newItemDetails = req.body;
    const { success } = model_1.itemInputObject.safeParse(newItemDetails);
    if (!success) {
        return res.json({
            message: `Check inputs again`,
        });
    }
    try {
        const newItem = yield prisma.item.create({
            data: {
                name: newItemDetails.name,
                price: newItemDetails.price,
                quantity: newItemDetails.quantity,
            },
        });
        res.json({
            message: `${newItemDetails.quantity} units of ${newItem.name} is added to your invertory`,
        });
    }
    catch (error) {
        res.json({
            error: `Unable to add item, check error once ${error}`,
        });
    }
}));
exports.adminRouter.get("/getItems", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allItems = yield prisma.item.findMany();
        res.json({
            items: allItems,
        });
    }
    catch (error) {
        res.json({
            error: `Error while fetching items ${error}`,
        });
    }
}));
exports.adminRouter.delete("/deleteItem/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        yield prisma.item.delete({
            where: {
                id: id,
            },
        });
        res.json({
            message: "Item deleted successfully!",
        });
    }
    catch (error) {
        res.json({
            error: `${error}`,
        });
    }
}));
exports.adminRouter.put("/updateItem/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const itemId = req.params.id;
    try {
        const udpatedItem = yield prisma.item.update({
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
    }
    catch (error) {
        res.json({
            error: `${error}`,
        });
    }
}));
exports.adminRouter.put("/updateQuantity/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const itemId = req.params.id;
    const newQuantity = req.body.quantity;
    if (newQuantity <= 0) {
        res.json({
            message: `Atleast add a single quantity to inventory`,
        });
    }
    try {
        const updatedItem = yield prisma.item.update({
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
    }
    catch (error) {
        res.json({
            error: `Error while updating quanity, check error once ${error}`,
        });
    }
}));
