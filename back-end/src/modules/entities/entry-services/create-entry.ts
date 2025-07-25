import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import statusCodes from "../../../utils/status-codes";
import Entry from "../entry-model";

/**
 * @desc Create a new entry
 * @route POST /api/entries
 * @access Private
 */
export const createEntry = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { title, type, director, budget, location, duration, year } =
      req.body;

    /**
     * check if all data is provided
     */
    if (
      !title ||
      !type ||
      !director ||
      !budget ||
      !location ||
      !duration ||
      !year
    ) {
      res.status(statusCodes.BAD_REQUEST);
      throw new Error("missing data...");
    }

    /**
     * check if entry already exists
     */
    if (await Entry.findOne({ title })) {
      res.status(statusCodes.CONFLICT);
      throw new Error("entry already exists");
    }

    const entry = await Entry.create({
      title,
      type,
      director,
      budget,
      location,
      duration,
      year,
    });

    res.status(statusCodes.CREATED).json(entry);
  },
);
