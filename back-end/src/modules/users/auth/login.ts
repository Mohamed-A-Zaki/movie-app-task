import bcrypt from "bcrypt";
import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import validator from "validator";
import generateToken from "../../../utils/generate-token";
import statusCodes from "../../../utils/status-codes";
import User from "../user-model";

const login = expressAsyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  /***
   * check if name, email and password are provided
   */
  if (!email) {
    res.status(statusCodes.BAD_REQUEST);
    throw new Error("Email is required");
  }

  if (!password) {
    res.status(statusCodes.BAD_REQUEST);
    throw new Error("Password is required");
  }

  /***
   * Validate email and password
   */
  if (!validator.isEmail(email)) {
    res.status(statusCodes.BAD_REQUEST);
    throw new Error("Invalid email");
  }

  /**
   * check if user already exists
   */
  const user = await User.findOne({ email });

  if (!user) {
    res.status(statusCodes.NOTFOUND);
    throw new Error("User not found");
  }

  /***
   * check if password is correct
   */
  if (!(await bcrypt.compare(password, user.password))) {
    res.status(statusCodes.BAD_REQUEST);
    throw new Error("Incorrect password");
  }

  res.json({
    user: await User.findOne({ email }).select("-password"),
    token: generateToken(user._id.toString()),
  });
});

export default login;
