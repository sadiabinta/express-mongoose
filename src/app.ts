import express, { Application, Request, Response } from "express";
import { booksRoutes } from "./app/controllers/books.controller";
import { borrowRoutes } from "./app/controllers/borrow.controller";
import cors from "cors";

const app: Application = express();

app.use(
  cors({
    origin: [
      "https://redux-api-ten-omega.vercel.app",
      "http://localhost:5173",
      "https://redux-lllsn0cn9-sadiabintas-projects.vercel.app",
      "https://redux-api-sadiabintas-projects.vercel.app/",
      "https://redux-api-sadiabinta-sadiabintas-projects.vercel.app/",
    ],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use((req, res, next) => {
  console.log("Request Headers:", req.headers);
  next();
});

app.use("/api/books", booksRoutes);
app.use("/api/borrow", borrowRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send(`Welcome to the Library Management System`);
});

export default app;
