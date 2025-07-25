import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import statusCodes from "../../../utils/status-codes";
import User from "../user-model";

const getMe = expressAsyncHandler(async (_req: Request, res: Response) => {
  const user = await User.findById(res.locals.id).select("-password");

  /**
   * check if user exists
   */
  if (!user) {
    res.status(statusCodes.NOTFOUND);
    throw new Error("User not found");
  }

  res.json(user);
});

export default getMe;
