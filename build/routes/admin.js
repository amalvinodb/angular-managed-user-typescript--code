"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminUserController_1 = __importDefault(require("../controller/adminUserController"));
const tockenAutenticationMiddleware_1 = __importDefault(require("../middleware/tockenAutenticationMiddleware"));
const router = express_1.default.Router();
//to get all users to the admin side
router.get("/", tockenAutenticationMiddleware_1.default.authenticateTocken, adminUserController_1.default.getAllUser);
//to remove a user through the admin side
router.post("/deleteUser", tockenAutenticationMiddleware_1.default.authenticateTocken, adminUserController_1.default.deleteUser);
//to do search of the data with the user name
router.get("/doUserSearch", tockenAutenticationMiddleware_1.default.authenticateTocken, adminUserController_1.default.userSearch);
//exporting the routes
exports.default = router;
