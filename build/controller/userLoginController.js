"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../model/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretTocken = "26b5732ea9eaced91beebc01fce29213e9ff6d8f5294ca3c7f2710169e4fbb0aec19e127e30760ea54028ded74271781b2fb4b3feee44ad8bb22886a78abed9d";
//login controller for the application
exports.default = {
    async doSignUp(req, res) {
        if (req.body.Password === "" || req.body.Name === "" || req.body.Email === "" || !req.body.Password || !req.body.Name || !req.body.Email) {
            res.json({ status: false, message: "the data is invalid" });
            return;
        }
        req.body.Password = await bcrypt_1.default.hash(req.body.Password, 10);
        const user = new userModel_1.default({
            userName: req.body.Name,
            userEmail: req.body.Email,
            password: req.body.Password,
        });
        user
            .save(user)
            .then((data) => {
            res.json({ status: true, message: "user have been added" });
        })
            .catch((err) => {
            console.log(err);
            res.json({ status: false, message: "user adding error", error: err });
        });
    },
    doLogin(req, res) {
        userModel_1.default.findOne({ userName: req.body.Name })
            .then(async (data) => {
            if (data != null) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                await bcrypt_1.default.compare(req.body.Password, data.password).then((status) => {
                    if (status) {
                        const userData = {
                            Name: data.userName,
                            Email: data.userEmail,
                            Id: data._id
                        };
                        const acessTocken = jsonwebtoken_1.default.sign(userData, secretTocken, { expiresIn: "2h" });
                        res.send({ status: true, message: "user exist", tocken: acessTocken, user: userData });
                    }
                    else {
                        res.sendStatus(400).json({ status: false, message: "incorrect password" });
                    }
                });
            }
            else {
                res.json({ status: false, message: "user dosenot exist" });
            }
        })
            .catch((err) => {
            res.json({ status: false, message: "checking error", error: err });
        });
    },
};
