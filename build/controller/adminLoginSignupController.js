"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adminModel_1 = __importDefault(require("../model/adminModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretTocken = "26b5732ea9eaced91beebc01fce29213e9ff6d8f5294ca3c7f2710169e4fbb0aec19e127e30760ea54028ded74271781b2fb4b3feee44ad8bb22886a78abed9d";
exports.default = {
    async doSignUp(req, res) {
        req.body.Password = await bcrypt_1.default.hash(req.body.Password, 10);
        const admin = new adminModel_1.default({
            AdminName: req.body.Name,
            AdminEmail: req.body.Email,
            password: req.body.Password,
        });
        admin
            .save(admin)
            .then((data) => {
            res.json({ status: true, message: "admin have been added" });
        })
            .catch((err) => {
            console.log(err);
            res.json({ status: false, message: "admin adding error" });
        });
    },
    doLogin(req, res) {
        //
        adminModel_1.default.findOne({ AdminName: req.body.Name }).then(async (data) => {
            if (data != null) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                await bcrypt_1.default.compare(req.body.Password, data.password).then((status) => {
                    if (status) {
                        const adminData = {
                            name: data.AdminName,
                            email: data.AdminEmail,
                        };
                        const acessTocken = jsonwebtoken_1.default.sign(adminData, secretTocken, { expiresIn: "2h" });
                        res.send({ status: true, message: "user exist", tocken: acessTocken, admin: adminData });
                    }
                    else {
                        res.send({ status: false, message: "incorrect password" });
                    }
                });
            }
            else {
                res.send({ status: false, message: "user dosenot exist" });
            }
        });
    },
};
