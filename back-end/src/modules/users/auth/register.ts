import bcrypt from "bcrypt";
import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import validator from "validator";
import generateToken from "../../../utils/generate-token";
import statusCodes from "../../../utils/status-codes";
import User from "../user-model";

const register = expressAsyncHandler(async (req: Request, res: Response) => {
  const { firstName, lastName, email, phone, password } = req.body;

  /***
   * check if name, email and password are provided
   */
  if (!firstName) {
    res.status(statusCodes.BAD_REQUEST);
    throw new Error("firstName is required");
  }

  if (!lastName) {
    res.status(statusCodes.BAD_REQUEST);
    throw new Error("lastName is required");
  }

  if (!email) {
    res.status(statusCodes.BAD_REQUEST);
    throw new Error("Email is required");
  }

  if (!phone) {
    res.status(statusCodes.BAD_REQUEST);
    throw new Error("phone is required");
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

  if (!validator.isMobilePhone(phone, "ar-EG")) {
    res.status(statusCodes.BAD_REQUEST);
    throw new Error("Invalid phone number");
  }

  if (!validator.isStrongPassword(password)) {
    res.status(statusCodes.BAD_REQUEST);
    throw new Error("Password is not strong enough");
  }

  /**
   * check if user already exists
   */
  if (await User.findOne({ email })) {
    res.status(statusCodes.BAD_REQUEST);
    throw new Error("User already exists");
  }

  /**
   * hash password
   */
  const hashed_password = await bcrypt.hash(password, 10);

  /***
   * create user
   */
  const user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password: hashed_password,
  });

  res.json({
    user: await User.findOne({ email }).select("-password"),
    token: generateToken(user._id.toString()),
  });
});

export default register;
