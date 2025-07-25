import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import isValidId from "../../../utils/is-valid-id";
import statusCodes from "../../../utils/status-codes";
import User from "../user-model";

/**
 * @desc Get one user
 * @route GET /api/all-users/:id
 * @access Private
 */
export const getOneUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    /**
     * check if id is valid
     */
    if (!isValidId(id)) {
      res.status(statusCodes.BAD_REQUEST);
      throw new Error("invalid id");
    }

    const user = await User.findById(id).select("-password");

    /**
     * check if category exists
     */
    if (!user) {
      res.status(statusCodes.NOTFOUND);
      throw new Error("user not found");
    }

    res.status(statusCodes.OK).json(user);
  },
);
