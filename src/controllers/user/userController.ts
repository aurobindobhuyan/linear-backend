import { Request, Response } from "express";
import { asyncErrorHandler } from "../../utils/helper/errorHandlers";
import * as services from "./services";

//* GET ALL THE USERS
export const getAllUser = asyncErrorHandler(
  async (req: Request, res: Response) => {
    const fetchAllUsers = await services.getAllUser();
    res.json(fetchAllUsers);
  }
);

export const listAll = asyncErrorHandler(
  async (req: Request, res: Response) => {
    const { limit, page } = req.query;
    const response = await services.listAll({ page, limit });

    res.json(response);
  }
);

//* CREATING A NEW USER
export const createUser = asyncErrorHandler(
  async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    const createdUser = await services.createUser({
      username,
      email,
      password,
    });
    return res.json(createdUser);
  }
);

//* UPDATING AN EXISTING USER
export const updateUser = asyncErrorHandler(
  async (req: Request, res: Response) => {
    const { userId: id } = req.params;
    const { username, roles, active } = req.body;

    const result = await services.updateUser({ id, username, roles, active });
    res.json(result);
  }
);

//* DELETING AN USER
export const deleteUser = asyncErrorHandler(
  async (req: Request, res: Response) => {
    const { userId: id } = req.params;

    const result = await services.deleteUser({ id });
    res.json(result);
  }
);

//* GET ONE USER DETAILS
export const getOneUser = asyncErrorHandler(
  async (req: Request, res: Response) => {
    const { userId: id } = req.params;

    const result = await services.getOneUser({ id });
    res.json(result);
  }
);
