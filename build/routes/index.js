"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userLoginController_1 = __importDefault(require("../controller/userLoginController"));
const adminLoginSignupController_1 = __importDefault(require("../controller/adminLoginSignupController"));
const router = express_1.default.Router();
//this is the user signup side of the page.
router.post("/userSignUp", userLoginController_1.default.doSignUp);
//this is the user login side of the page.
router.post("/userLogin", userLoginController_1.default.doLogin);
//this is the admin SignUp page
router.post("/adminSignup", adminLoginSignupController_1.default.doSignUp);
//this is the admin login page
router.post("/adminLogin", adminLoginSignupController_1.default.doLogin);
//exporting the routes
exports.default = router;
