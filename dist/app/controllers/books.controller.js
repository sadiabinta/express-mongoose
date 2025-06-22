"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRoutes = void 0;
const express_1 = __importDefault(require("express"));
const books_model_1 = require("../models/books.model");
const zod_1 = require("zod");
exports.booksRoutes = express_1.default.Router();
const CreateBookZodSchema = zod_1.z.object({
    title: zod_1.z.string(),
    author: zod_1.z.string(),
    genre: zod_1.z.string(),
    isbn: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    copies: zod_1.z.number(),
    available: zod_1.z.boolean()
});
exports.booksRoutes.post('/', async (req, res) => {
    try {
        const body = await CreateBookZodSchema.parseAsync(req.body);
        const book = await books_model_1.Book.create(body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book
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
exports.booksRoutes.get('/', async (req, res) => {
    // const genre=req.params
    try {
        let books = [];
        const genre = req.query.filter;
        if (genre) {
            books = await books_model_1.Book.find({ genre: genre });
        }
        else {
            books = await books_model_1.Book.find();
        }
        res.status(201).json({
            success: true,
            message: "Book retrieved successfully",
            data: books
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
