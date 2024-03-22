import { Request, Response, NextFunction } from "express";
import { OperationalError } from "./errorInstances";

export const asyncErrorHandler = (fn: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error: any) => next(error));
  };
};

const CastErrorHandler = (err: any) => {
  const message = `Invalid value: ${err.value} for field ${err.path}`;
  return new OperationalError(400, message);
};

const CastErrorForData = (err: any) => {
  console.log("error", err.errors[Object.keys(err.errors)[0]].name);
  const message = `${err._message}: Cannot convert ${err.errors.createdUserId.value} for field ${err.errors.createdUserId.path}`;
  return new OperationalError(err.statusCode, message);
};

const DuplicateErrorHandler = (err: any) => {
  const data = Object.entries(err.keyValue);
  const message = `Duplicate record detected ${data[0][0]}: ${data[0][1]}. Please use a different.`;
  return new OperationalError(400, message);
};

export const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "Failed";

  if (error.name == "CastError") {
    error = CastErrorHandler(error);
  }
  if (error?.errors?.[Object.keys(error.errors)[0]]?.name === "CastError") {
    error = CastErrorForData(error);
  }
  if (error.code == 11000) {
    error = DuplicateErrorHandler(error);
  }

  return res.status(error.statusCode).json({
    status: error.status,
    statusCode: error.statusCode,
    message: error.message,
    stackTrace: error.stack,
    error,
  });
};
