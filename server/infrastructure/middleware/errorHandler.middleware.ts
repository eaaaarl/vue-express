import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { AppError } from "../errors/customErrors";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import { handlePrismaError } from "../../utils/handlePrismaError";
import { ZodError } from "zod";

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const defaultErrorResponse = {
    status: "error",
    message: "Something went wrong, Internal Server Error",
  };

  let errorResponse = { ...defaultErrorResponse };

  //Custom App Errors
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
    return;
  }

  //Prisma Errors
  if (err instanceof PrismaClientKnownRequestError) {
    errorResponse = handlePrismaError(err);
    res.status(errorResponse.status === "fail" ? 400 : 500).json(errorResponse);
    return;
  }
  if (err instanceof PrismaClientValidationError) {
    errorResponse = {
      status: "fail",
      message: "Invalid data provided",
    };
    res.status(400).json(errorResponse);
    return;
  }

  // Zod Validation Errors
  if (err instanceof ZodError) {
    const formattedErrors = err.errors.map((error) => {
      return {
        path: error.path.join("."),
        message: error.message,
      };
    });

    res.status(400).json({
      status: "fail",
      message: "Validation error",
      errors: formattedErrors,
    });
    return;
  }
  res.status(500).json(errorResponse);
};
