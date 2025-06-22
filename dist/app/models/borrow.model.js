"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Borrow = void 0;
const mongoose_1 = require("mongoose");
const borrowSchema = new mongoose_1.Schema({
    book: { type: mongoose_1.Schema.Types.ObjectId, ref: "Book", required: true },
    quantity: { type: Number, min: [0, 'Copies must be a positive number'] },
    dueDate: { Date }
}, {
    versionKey: false,
    timestamps: true
});
borrowSchema.method('updateAvailability', function updateAvailability(copies) {
    if (copies == 0) {
        this.save();
        return false;
    }
    else {
        return true;
    }
});
exports.Borrow = (0, mongoose_1.model)("Borrow", borrowSchema);
