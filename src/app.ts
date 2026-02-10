import { Request, Response } from "express";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./app/Routes/route";
import globalError from "./app/middlewares/globarError";
import notFound from "./app/middlewares/notFount";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/v1", router);

// global error
app.use(globalError);
app.use(notFound);
export default app;
