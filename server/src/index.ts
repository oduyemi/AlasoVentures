import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { db, store } from "./config/index";
import AppError from "./utils/app.error";
import appRoutes from "./routes/app.route";
import contactRoutes from "./routes/contact.route";
import next from "next";

dotenv.config();

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev, dir: "../" });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const app = express();

  const corsOptions = {
    origin: ["http://localhost:3000", "https://alaso-ventures.vercel.app"],
    credentials: true,
  };

  app.use(express.json());
  app.use(cors(corsOptions));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(
    session({
      secret: process.env.SECRET_KEY!,
      resave: false,
      saveUninitialized: false,
      // store: store,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 1000 * 60 * 60, // 1 hour
      },
    })
  );



  // Load API routes
  // app.use("/api", appRoutes);
  // app.use("/api/contact", contactRoutes);

  // 404 handler ONLY for unknown API routes
  app.all("/api/*", (req, res, next) => {
    next(
      new AppError(
        `The API route ${req.originalUrl} with method ${req.method} does not exist!`,
        404
      )
    );
  });

  // Global error handler BEFORE Next.js routes
  app.use(
    (err: AppError, req: express.Request, res: express.Response, next: express.NextFunction) => {
      const statusCode = err.statusCode || 500;
      res.status(statusCode).json({
        status: "error",
        message: err.message,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
      });
    }
  );

  // Let Next.js handle all other routes (frontend)
  app.all("*", (req, res) => {
    return handle(req, res);
  });

  db.once("open", () => {
    console.log("Connected to MongoDB");

    const PORT: number | string = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  });

  db.on("error", console.error.bind(console, "MongoDB Connection Error:"));
});
