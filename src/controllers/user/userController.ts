import { Request, Response } from "express";
import { AsyncHandler } from "../../utils/helper/errorHandlers";
import * as service from "./services";

export const getAllUsers = AsyncHandler(
  async (req: Request, res: Response) => {}
);

export const getOneUser = AsyncHandler(
  async (req: Request, res: Response) => {}
);

export const createUser = AsyncHandler(
  async (req: Request, res: Response) => {}
);

export const updateUser = AsyncHandler(
  async (req: Request, res: Response) => {}
);

export const deleteUser = AsyncHandler(
  async (req: Request, res: Response) => {}
);
