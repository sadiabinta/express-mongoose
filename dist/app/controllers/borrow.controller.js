"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRoutes = void 0;
const books_model_1 = require("./../models/books.model");
const express_1 = __importDefault(require("express"));
const borrow_model_1 = require("../models/borrow.model");
exports.borrowRoutes = express_1.default.Router();
exports.borrowRoutes.post('/', async (req, res) => {
    try {
        const { book: bookId, quantity } = req.body;
        const updatedBook = await books_model_1.Book.borrowBook(bookId, quantity);
        const borrow = await borrow_model_1.Borrow.create({
            book: bookId,
            quantity,
            dueDate: req.body.dueDate
        });
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrow
        });
    }
    catch (error) {
        res.status(404).json({
            message: "Validation failed",
            success: false,
            error
        });
    }
});
exports.borrowRoutes.get('/', async (req, res) => {
    try {
        const borrowedBook = await borrow_model_1.Borrow.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" }
                }
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookDetails"
                }
            },
            {
                $unwind: "$bookDetails"
            },
            {
                $project: {
                    _id: 0,
                    totalQuantity: 1,
                    book: {
                        title: "$bookDetails.title",
                        isbn: "$bookDetails.isbn"
                    }
                }
            }
        ]);
        res.status(201).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: borrowedBook
        });
    }
    catch (error) {
        res.status(404).json({
            message: "Validation failed",
            success: false,
            error
        });
    }
});
