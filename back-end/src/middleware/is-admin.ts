import expressAsyncHandler from "express-async-handler";
import User from "../modules/users/user-model";
import statusCodes from "../utils/status-codes";

const isAdmin = expressAsyncHandler(async (req, res, next) => {
  const user = await User.findById(res.locals.id);

  if (user?.role === "admin") {
    return next();
  } else {
    res.status(statusCodes.UNAUTHORIZED);
    throw new Error("Not authorized as an admin");
  }
});

export default isAdmin;
