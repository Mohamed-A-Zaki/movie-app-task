import express from "express";
import isAdmin from "../../middleware/is-admin";
import requireAuth from "../../middleware/require-auth";
import { blockUser } from "./admin/block-user";
import { deleteOneUser } from "./admin/delete-one-user";
import { getAllUsers } from "./admin/get-all-users";
import { getOneUser } from "./admin/get-one-user";
import { unBlockUser } from "./admin/un-block-user";
import { updateUser } from "./admin/update-user";
import login from "./auth/login";
import register from "./auth/register";
import getMe from "./me/get-me";
import { updateMe } from "./me/update-me";

const userRouter = express.Router();

/***
 * @desc Auth
 */
userRouter.route("/login").post(login);
userRouter.route("/register").post(register);

/***
 * @desc Me
 */
userRouter.route("/me").get(requireAuth, getMe);
userRouter.route("/me/update").put(requireAuth, updateMe);

/***
 * @desc Admin
 */
userRouter.route("/all-users").get(requireAuth, isAdmin, getAllUsers);
userRouter.route("/all-users/:id/block").put(requireAuth, isAdmin, blockUser);
userRouter
  .route("/all-users/:id/un-block")
  .put(requireAuth, isAdmin, unBlockUser);
userRouter
  .route("/all-users/:id")
  .get(requireAuth, isAdmin, getOneUser)
  .delete(requireAuth, isAdmin, deleteOneUser)
  .put(requireAuth, isAdmin, updateUser);

export default userRouter;
