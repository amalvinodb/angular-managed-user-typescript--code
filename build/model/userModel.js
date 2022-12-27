"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    userName: {
        type: String,
        require: true,
        unique: true,
        dropDubs: true
    },
    userEmail: {
        type: String,
        require: true,
        unique: true,
        dropDubs: true
    },
    password: {
        type: String,
        require: true,
    },
    image: {
        type: String,
    }
});
const User = mongoose_1.default.model("User", schema);
exports.default = User;
