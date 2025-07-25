import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import isValidId from "../../../utils/is-valid-id";
import statusCodes from "../../../utils/status-codes";
import Entry from "../entry-model";

/**
 * @desc Update an entry
 * @route PUT /api/entries/:id
 * @access Private
 */
export const updateEntry = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    // const { title, type, director, budget, location, duration, year } =
    //   req.body;

    /**
     * check if id is valid
     */
    if (!isValidId(id)) {
      res.status(statusCodes.BAD_REQUEST);
      throw new Error("invalid id");
    }

    const entry = await Entry.findByIdAndUpdate(
      id,
      { ...req.body },
      {
        new: true,
      },
    );

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
