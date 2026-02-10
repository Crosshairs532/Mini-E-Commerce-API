import express, { Request, Response } from "express";

const homeRoute = express.Router();
homeRoute.get("", (req: Request, res: Response) => {
  res.send("Mini E-Commerce API");
});

export default homeRoute;
