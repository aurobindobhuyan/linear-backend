import { Request, Response } from "express";
import { asyncErrorHandler } from "../../utils/helper/errorHandlers";
import { OperationalError } from "../../utils/helper/errorInstances";
import * as service from "./services";

export const login = asyncErrorHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { accessToken, refreshToken } = await service.login({
    email,
    password,
  });

  // Create the secret cookie with the refresh token
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true, // Allow cookies to the web server only
    secure: true, // Allow https only
    sameSite: "none", // Cross-site cookie
    maxAge: 1000 * 60 * 60 * 24, // set to 1day
  });

  res.status(200).json(accessToken);
});

export const refresh = asyncErrorHandler(
  async (req: Request, res: Response) => {
    const cookies = req.cookies;

    if (!cookies?.refreshToken)
      throw new OperationalError(403, "Invalid Token! Login Again");

    const { accessToken } = await service.refresh({
      refreshToken: cookies.refreshToken,
    });
    res.status(200).json(accessToken);
  }
);

export const logout = asyncErrorHandler(async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.refreshToken) res.status(204); // No Content

  res.clearCookie("refreshToken");
  res.json({ message: "Cookie cleared" });
});
