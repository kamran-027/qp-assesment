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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
exports.userRouter = express_1.default.Router();
const prisma = new client_1.PrismaClient();
exports.userRouter.get("/checkItems", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allItems = yield prisma.item.findMany({
            where: {
                quantity: {
                    gt: 0,
                },
            },
        });
        res.json({
            items: allItems,
        });
    }
    catch (error) {
        res.json({
            error: error,
        });
    }
}));
exports.userRouter.post("/buyItems", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const itemsToBuy = req.body;
    try {
        itemsToBuy.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            yield prisma.item.update({
                where: {
                    id: item.id,
                },
                data: {
                    quantity: {
                        decrement: Number(item.quantity),
                    },
                },
            });
        }));
        res.json({
            message: `Items bought successfully!`,
        });
    }
    catch (error) {
        res.json({
            error: error,
        });
    }
}));
