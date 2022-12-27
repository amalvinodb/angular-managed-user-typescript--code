"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretTocken = "26b5732ea9eaced91beebc01fce29213e9ff6d8f5294ca3c7f2710169e4fbb0aec19e127e30760ea54028ded74271781b2fb4b3feee44ad8bb22886a78abed9d";
exports.default = {
    authenticateTocken: (req, res, next) => {
        const tocken = req.headers["autharization"];
        if (tocken !== undefined) {
            try {
                const data = jsonwebtoken_1.default.verify(tocken, secretTocken);
                if (data) {
                    next();
                }
            }
            catch (err) {
                res.json({ status: false, message: "invalid tocken", error: err });
            }
        }
        else {
            res.json({
                status: false,
                message: "the auth tocken is invalid",
            });
        }
    },
};
