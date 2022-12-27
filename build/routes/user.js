"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userManagemantController_1 = __importDefault(require("../controller/userManagemantController"));
const tockenAutenticationMiddleware_1 = __importDefault(require("../middleware/tockenAutenticationMiddleware"));
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({}),
    fileFilter: (req, file, cb) => {
        cb(null, true);
    },
});
const router = express_1.default.Router();
//to route to the actual user page in the routes.
router.get("/", tockenAutenticationMiddleware_1.default.authenticateTocken, userManagemantController_1.default.getUserPage);
//get user details for editing
router.get("/editUser", tockenAutenticationMiddleware_1.default.authenticateTocken, userManagemantController_1.default.getUserDetails);
//to edit the user details
router.post("/editUser", tockenAutenticationMiddleware_1.default.authenticateTocken, userManagemantController_1.default.editUserDetails);
//uploading the user image
router.post("/uploadImage", upload.single('image'), tockenAutenticationMiddleware_1.default.authenticateTocken, userManagemantController_1.default.uploadImage);
//exporting the routes
exports.default = router;
