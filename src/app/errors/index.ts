import mongoose from "mongoose";
import { TerrorSource, TGenericErrorResponse } from "../interface/error";
import { ZodError } from "zod";

export const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const statusCode = 400;
  const errorSource: TerrorSource = [{ path: err.path, message: err.message }];
  return {
    statusCode,
    message: "Invalid Id",
    errorSource,
  };
};

export const handleDuplicateError = (err: any) => {
  const statusCode = 400;
  const match = err.message.match(/"([^"]*)"/);
  const extracted_msg = match && match[1];
  const errorSource: TerrorSource = [
    { path: "", message: ` ${extracted_msg} is already exists ` },
  ];
  return {
    statusCode,
    message: "Duplicated Error",
    errorSource,
  };
};

export const handleValidationError = (err: mongoose.Error.ValidationError) => {
  const errorSource: TerrorSource = Object.values(err.errors).map((val) => {
    return {
      path: val.name,
      message: val.message,
    };
  });
  const statusCode = 400;
  return {
    statusCode,
    message: "validation Error",
    errorSource,
  };
};

export const handleZodError = (err: ZodError) => {
  let statusCode = 400;
  let errorSource = err.issues.map((issue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });
  return {
    statusCode,
    message: "Zod Validation Error",
    errorSource,
  };
};
