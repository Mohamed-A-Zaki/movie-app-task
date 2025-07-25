import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import statusCodes from "../../../utils/status-codes";
import Entry from "../entry-model";

/**
 * @desc Delete all entries
 * @route DELETE /api/entries
 * @access Private
 */
export const deleteAllEntries = expressAsyncHandler(
  async (_req: Request, res: Response) => {
    await Entry.deleteMany();
    res.status(statusCodes.NO_CONTENT).json();
  },
);
