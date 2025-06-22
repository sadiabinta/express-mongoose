"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const borrow_model_1 = require("../models/borrow.model");
exports.borrowRoutes = express_1.default.Router();
exports.borrowRoutes.post('/', async (req, res) => {
    const body = req.body;
    const borrow = await borrow_model_1.Borrow.create(body);
    res.status(201).json({
        success: true,
        message: "Book borrowed successfully",
        data: borrow
    });
});
exports.borrowRoutes.get('/', async (req, res) => {
    const borrowedBook = borrow_model_1.Borrow.find();
    res.status(201).json({
        success: true,
        message: "Book borrowed successfully",
        data: borrowedBook
    });
});
