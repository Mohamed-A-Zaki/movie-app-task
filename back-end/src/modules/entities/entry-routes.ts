import express from "express";
import { createEntry } from "./entry-services/create-entry";
import { deleteAllEntries } from "./entry-services/delete-all-entries";
import { deleteOneEntry } from "./entry-services/delete-one-entry";
import { getAllEntries } from "./entry-services/get-all-entries";
import { getOneEntry } from "./entry-services/get-one-entry";
import { updateEntry } from "./entry-services/update-entry";

const entryRouter = express.Router();

entryRouter
  .route("/")
  .get(getAllEntries)
  .post(createEntry)
  .delete(deleteAllEntries);

entryRouter
  .route("/:id")
  .get(getOneEntry)
  .put(updateEntry)
  .delete(deleteOneEntry);

export default entryRouter;
