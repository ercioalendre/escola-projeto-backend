import jwt from "@config/auth/jwt";
import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface ITokenPayLoad {
  iat: number;
  ext: number;
  sub: string;
  name: string;
}

export default function isAuthenticated(req: Request, res: Response, next: NextFunction): void {
  const headerAuth = req.headers.authorization || "";
  const [, token] = headerAuth.split(" ");

  if (!token) {
    throw new AppError("Token is missing.", 401);
  }

  try {
    const decodedToken = verify(token, jwt.secret);
    const { sub, name } = decodedToken as ITokenPayLoad;

    const firstName = name.split(" ")[0];

    res.locals.user = {
      id: sub,
      name: firstName,
    };

    return next();
  } catch {
    throw new AppError("Invalid token.", 401);
  }
}
