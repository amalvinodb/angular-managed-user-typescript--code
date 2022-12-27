"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const index_1 = __importDefault(require("./routes/index"));
const user_1 = __importDefault(require("./routes/user"));
const admin_1 = __importDefault(require("./routes/admin"));
const cors_1 = __importDefault(require("cors"));
const connections_1 = __importDefault(require("./connections/connections"));
const app = (0, express_1.default)();
const corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true,
    optionSuccessStatus: 200
};
app.use((0, cors_1.default)(corsOptions));
const port = 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
(0, connections_1.default)();
app.use("/", index_1.default);
app.use("/user", user_1.default);
app.use("/admin", admin_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
// golbal error handling middle ware
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    console.log(err);
    // render the error page
    res.status(req.statusCode || 500);
    res.json({
        status: "error",
        message: err.message,
        stack: req.app.get("env") === "development" ? err.stack : {},
    });
});
app.listen(port, () => {
    console.log("server started");
});
