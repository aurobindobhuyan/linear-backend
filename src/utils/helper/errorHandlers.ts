import { Request, Response, NextFunction } from "express";

export const AsyncHandler = (fn: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err: any) => next(err));
  };
};

export const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  error.statusCode = res.statusCode || 500;
  error.status = error.status || "Failed";

  return res.status(error.statusCode).json({
    status: error.status,
    statusCode: error.statusCode,
    message: error.message,
    stackTrace: error.stack,
    error,
  });
};
