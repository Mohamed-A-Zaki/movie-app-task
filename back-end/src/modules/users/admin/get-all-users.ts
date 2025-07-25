import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import statusCodes from "../../../utils/status-codes";
import User from "../user-model";

/**
 * @desc Get all users
 * @route GET /api/all-users
 * @access Private
 */
export const getAllUsers = expressAsyncHandler(
  async (req: Request, res: Response) => {
    /**
     * pagination
     */
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    /**
     * get all users
     */
    const users = await User.find().select("-password").skip(skip).limit(limit);

    res.status(statusCodes.OK).json({
      results: users.length,
      page: page,
      data: users,
    });
  },
);
