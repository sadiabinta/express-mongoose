import express, { Application, Request, Response } from "express";
import cors from "cors";
import { booksRoutes } from "./app/controllers/books.controller";
import { borrowRoutes } from "./app/controllers/borrow.controller";

const app: Application = express();

const allowedOrigins = [
  "https://redux-api-ten-omega.vercel.app",
  "http://localhost:5173",
];

const corsOptions = {
  origin: (origin: string | undefined, callback: Function) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "HEAD", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: false,
};

app.use(cors(corsOptions));

// Enable OPTIONS preflight for all routes
// app.options("/*", cors(corsOptions));

app.use(express.json());

// Your routes (check these files for route param errors)
app.use("/books", booksRoutes);
app.use("/borrow", borrowRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send(`Welcome to the Library Management System`);
});

export default app;
