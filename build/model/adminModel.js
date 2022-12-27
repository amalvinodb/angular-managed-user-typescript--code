"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    AdminName: {
        type: String,
        require: true,
    },
    AdminEmail: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    image: {
        type: String,
    }
});
const Admin = mongoose_1.default.model("Admin", schema);
exports.default = Admin;
