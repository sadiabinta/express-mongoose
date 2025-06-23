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
    const body = req.body;
    const bookId = body.book;
    const borrow = await borrow_model_1.Borrow.create(body);
    const updatedBook = await books_model_1.Book.findOneAndUpdate({ _id: bookId, copies: { $gt: 0 } }, { $inc: { copies: -1 } }, { new: true });
    // if(copies){
    //     copies=copies-1;
    //     book?.copies=copies;
    //     await book?.save()
    // }
    // const borrow=new Borrow(body)
    // console.log(borrow.updateAvailability(4));
    // borrow.save()
    res.status(201).json({
        success: true,
        message: "Book borrowed successfully",
        data: borrow
    });
});
exports.borrowRoutes.get('/', async (req, res) => {
    const borrowedBook = await borrow_model_1.Borrow.find().populate('book');
    res.status(201).json({
        success: true,
        message: "Book borrowed successfully",
        data: borrowedBook
    });
});
