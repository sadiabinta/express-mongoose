"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
let server;
const PORT = 5000;
async function main() {
    try {
        await mongoose_1.default.connect('mongodb+srv://mongodb:mongodb@cluster0.gwkhwjr.mongodb.net/Library-Management-System?retryWrites=true&w=majority&appName=Cluster0');
        server = app_1.default.listen(PORT, () => {
            console.log(`App is listening to PORT ${PORT}`);
        });
    }
    catch (error) {
    }
}
main();
