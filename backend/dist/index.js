"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_1 = require("./admin");
const user_1 = require("./user");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/admin", admin_1.adminRouter);
app.use("/user", user_1.userRouter);
app.listen(3000, () => {
    console.log(`Listening on port 3000`);
});
