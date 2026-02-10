import { Request, Response } from "express";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.get("/", (req: Request, res: Response) => {
  res.send("Mini E-Commerce API");
});

export default app;
