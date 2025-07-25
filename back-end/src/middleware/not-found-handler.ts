import { Request, Response } from "express";

const notFoundHandler = (req: Request, res: Response) => {
  (req: Request, res: Response) => {
    res.status(404).json({
      message: `Can't find ${req.originalUrl} on this server!`,
    });
  };
};

export default notFoundHandler;
