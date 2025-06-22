"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRoutes = void 0;
const express_1 = __importDefault(require("express"));
const books_model_1 = require("../models/books.model");
exports.booksRoutes = express_1.default.Router();
exports.booksRoutes.post('/', async (req, res) => {
    const body = req.body;
    const book = await books_model_1.Book.create(body);
    res.status(201).json({
        success: true,
        message: "Book created successfully",
        data: book
    });
});
exports.booksRoutes.get('/', async (req, res) => {
    // const genre=req.params
    const books = await books_model_1.Book.find();
    res.status(201).json({
        success: true,
        message: "Book retrieved successfully",
        data: books
    });
});
exports.booksRoutes.get('/:bookId', async (req, res) => {
    const bookId = req.params.bookId;
    const book = await books_model_1.Book.findById(bookId);
    res.status(201).json({
        success: true,
        message: "Book retrieved successfully",
        data: book
    });
});
exports.booksRoutes.patch('/:bookId', async (req, res) => {
    const bookId = req.params.bookId;
    const updatedInfo = req.body;
    const book = await books_model_1.Book.findByIdAndUpdate(bookId, updatedInfo, { new: true });
    res.status(201).json({
        success: true,
        message: "Book updated successfully",
        data: book
    });
});
exports.booksRoutes.delete('/:bookId', async (req, res) => {
    const bookId = req.params.bookId;
    const book = await books_model_1.Book.findOneAndDelete({ _id: bookId }, { new: true });
    res.status(201).json({
        success: true,
        message: "Book deleted successfully",
        data: book
    });
});
