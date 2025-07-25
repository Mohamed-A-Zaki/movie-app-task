import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import isValidId from "../../../utils/is-valid-id";
import statusCodes from "../../../utils/status-codes";
import User from "../user-model";

/**
 * @desc Update me
 * @route PUT /api/auth/update-me
 * @access Private
 */
export const updateMe = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const id = res.locals.id;

    /**
     * check if id is valid
     */
    if (!isValidId(id)) {
      res.status(statusCodes.BAD_REQUEST);
      throw new Error("invalid id");
    }

    /***
     * check if user is updating password
     */
    if (req.body.password) {
      res.status(statusCodes.BAD_REQUEST);
      throw new Error("Cannot update password");
    }

    const user = await User.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true },
    ).select("-password");

    /**
     * check if user exists
     */
    if (!user) {
      res.status(statusCodes.NOTFOUND);
      throw new Error("user not found");
    }

    res.status(statusCodes.OK).json(user);
  },
);
