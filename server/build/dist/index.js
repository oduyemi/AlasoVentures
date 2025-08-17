"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const index_1 = require("./config/index");
const app_error_1 = __importDefault(require("./utils/app.error"));
const next_1 = __importDefault(require("next"));
dotenv_1.default.config();
const dev = process.env.NODE_ENV !== "production";
const nextApp = (0, next_1.default)({ dev, dir: "../" });
const handle = nextApp.getRequestHandler();
nextApp.prepare().then(() => {
    const app = (0, express_1.default)();
    const corsOptions = {
        origin: ["http://localhost:3000", "https://alaso-ventures.vercel.app"],
        credentials: true,
    };
    app.use(express_1.default.json());
    app.use((0, cors_1.default)(corsOptions));
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    // Load API routes
    // app.use("/api", appRoutes);
    // app.use("/api/contact", contactRoutes);
    // 404 handler ONLY for unknown API routes
    app.all("/api/*", (req, res, next) => {
        next(new app_error_1.default(`The API route ${req.originalUrl} with method ${req.method} does not exist!`, 404));
    });
    // Global error handler BEFORE Next.js routes
    app.use((err, req, res, next) => {
        const statusCode = err.statusCode || 500;
        res.status(statusCode).json(Object.assign({ status: "error", message: err.message }, (process.env.NODE_ENV === "development" && { stack: err.stack })));
    });
    // Let Next.js handle all other routes (frontend)
    app.all("*", (req, res) => {
        return handle(req, res);
    });
    index_1.db.once("open", () => {
        console.log("Connected to MongoDB");
        const PORT = process.env.PORT || 4000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    });
    index_1.db.on("error", console.error.bind(console, "MongoDB Connection Error:"));
});
