import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import statusCodes from "../../../utils/status-codes";
import Entry from "../entry-model";

/**
 * @desc Get all entries
 * @route GET /api/entries
 * @access Public
 */
export const getAllEntries = expressAsyncHandler(
  async (req: Request, res: Response) => {
    /**
     * pagination
     */
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    /**
     * get entries
     */
    const totalEntries = await Entry.countDocuments();
    const entries = await Entry.find().skip(skip).limit(limit);
    const totalPages = Math.ceil(totalEntries / limit);

    res.status(statusCodes.OK).json({
      results: entries.length,
      page: page,
      totalPages: totalPages,
      data: entries,
    });
  },
);
