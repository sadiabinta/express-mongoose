"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Borrow = void 0;
const objectid_1 = require("./../../../node_modules/bson/src/objectid");
const mongoose_1 = require("mongoose");
const borrowSchema = new mongoose_1.Schema({
    book: { type: objectid_1.ObjectId },
    quantity: { type: Number },
    dueDate: { Date }
}, {
    versionKey: false,
    timestamps: true
});
exports.Borrow = (0, mongoose_1.model)("Borrow", borrowSchema);
