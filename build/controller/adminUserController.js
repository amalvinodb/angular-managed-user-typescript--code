"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../model/userModel"));
const mongodb_1 = require("mongodb");
exports.default = {
    getAllUser(req, res) {
        userModel_1.default.find()
            .then((data) => {
            res.json({ status: true, message: "sending all users", users: data });
        })
            .catch((err) => {
            res.json({ status: false, message: "error while fetching all users", error: err });
        });
    },
    deleteUser(req, res) {
        const user = req.body.userId;
        userModel_1.default.deleteOne({ _id: new mongodb_1.ObjectId(user) })
            .then((data) => {
            res.json({ status: true, message: "deleted the user", data });
        })
            .catch((err) => {
            res.json({ status: false, message: "failed to delete the user", error: err });
        });
    },
    userSearch(req, res) {
        const name = req.query.name;
        userModel_1.default.find({ userName: { $regex: name } }).then((data) => {
            res.json({ data });
        });
    },
};
