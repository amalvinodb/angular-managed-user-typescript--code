"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../model/userModel"));
const mongodb_1 = require("mongodb");
const cloudinary_1 = __importDefault(require("cloudinary"));
cloudinary_1.default.v2.config({
    cloud_name: "dzmqstses",
    api_key: "496591628439112",
    api_secret: "UErHHUocO5UkUIJMQZNXaUZm-IU",
});
//every functions that can be written for the non user related oprerations
exports.default = {
    getUserPage(req, res) {
        const userId = req.query.userId;
        userModel_1.default.findOne({ _id: new mongodb_1.ObjectId(userId) })
            .then((data) => {
            res.json({ status: true, message: "found the user", user: data });
        })
            .catch((err) => {
            res.json({ status: false, message: "invalid user data", error: err });
        });
    },
    getUserDetails(req, res) {
        const userId = req.query.userId;
        userModel_1.default.findOne({ _id: new mongodb_1.ObjectId(userId) })
            .then((data) => {
            res.json({ status: true, message: "found the user", user: data });
        })
            .catch((err) => {
            res.json({ status: false, message: "invalid user data", error: err });
        });
    },
    editUserDetails(req, res) {
        console.log(req.body);
        userModel_1.default.updateOne({ _id: new mongodb_1.ObjectId(req.body._id) }, {
            $set: {
                userName: req.body.Name,
                userEmail: req.body.Email,
            },
        })
            .then((data) => {
            console.log(data, "this is the data");
            res.json({ status: true, message: "sucessfully edited the contene" });
        })
            .catch((err) => {
            console.log(err);
        });
    },
    async uploadImage(req, res) {
        console.log(req.file);
        const result = new Promise((resolve, reject) => {
            cloudinary_1.default.v2.uploader.upload(req.file, (err, res) => {
                if (err)
                    return res.status(500).send("uploaded image error");
                resolve(res.secure_url);
            });
        });
        console.log(result);
    },
};
