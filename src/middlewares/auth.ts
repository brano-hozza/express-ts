import { NextFunction, Request, Response } from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers["authorization"] === `Bearer ${process.env.AUTH_TOKEN}`) return next();
  return res.status(500).send("Unauthorized");
};
