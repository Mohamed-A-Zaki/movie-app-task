import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import isValidId from "../../../utils/is-valid-id";
import statusCodes from "../../../utils/status-codes";
import User from "../user-model";

/**
 * @desc Delete one user
 * @route DELETE /api/all-users/:id
 * @access Private
 */
export const deleteOneUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    /**
     * check if id is valid
     */
    if (!isValidId(id)) {
      res.status(statusCodes.BAD_REQUEST);
      throw new Error("invalid id");
    }

    const user = await User.findByIdAndDelete(id);

    /**
     * check if user exists
     */
    if (!user) {
      res.status(statusCodes.NOTFOUND);
      throw new Error("user not found");
    }

    res.status(statusCodes.NO_CONTENT).json();
  },
);
