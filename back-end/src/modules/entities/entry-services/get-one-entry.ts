import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import isValidId from "../../../utils/is-valid-id";
import statusCodes from "../../../utils/status-codes";
import Entry from "../entry-model";

/**
 * @desc Get one entry
 * @route GET /api/entries/:id
 * @access Public
 */
export const getOneEntry = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    /**
     * check if id is valid
     */
    if (!isValidId(id)) {
      res.status(statusCodes.BAD_REQUEST);
      throw new Error("invalid id");
    }

    const entry = await Entry.findById(id);

    /**
     * check if entry exists
     */
    if (!entry) {
      res.status(statusCodes.NOTFOUND);
      throw new Error("entry not found");
    }

    res.status(statusCodes.OK).json(entry);
  },
);
