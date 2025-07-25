import app from "./utils/app";
import connectToDatabase from "./utils/connect-to-database";
import "./utils/config";
import "./utils/middlewares";

let isConnected = false;

import { Request, Response } from "express";

export default async function handler(req: Request, res: Response) {
  if (!isConnected) {
    await connectToDatabase();
    isConnected = true;
  }
  app(req, res);
}
