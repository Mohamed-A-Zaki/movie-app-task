import expressAsyncHandler from "express-async-handler";
import jwt, { JwtPayload } from "jsonwebtoken";

const requireAuth = expressAsyncHandler(async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new Error("you are not logged in");
  }

  const token = authorization.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
    if (err) {
      throw new Error("you are not logged in");
    }

    const { id } = decoded as JwtPayload;

    res.locals.id = id;
  });

  next();
});

export default requireAuth;
