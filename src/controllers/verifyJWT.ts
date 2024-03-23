import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization || req.headers.Authorization;

  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = header.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
};

export default verifyJWT;
