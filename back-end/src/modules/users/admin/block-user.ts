import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import isValidId from "../../../utils/is-valid-id";
import statusCodes from "../../../utils/status-codes";
import User from "../user-model";

/**
 * @desc block a user
 * @route PUT /api/all-users/:id/block
 * @access Private
 */
export const blockUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    /**
     * check if id is valid
     */
    if (!isValidId(id)) {
      res.status(statusCodes.BAD_REQUEST);
      throw new Error("invalid id");
    }

    const user = await User.findByIdAndUpdate(
      id,
      { isBlocked: true },
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
