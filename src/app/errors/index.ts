import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";
import { ZodError } from "zod";

export const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const statusCode = 400;
  const errorSources: TErrorSources = [
    { path: err.path, message: err.message },
  ];
  return {
    statusCode,
    message: "Invalid Id",
    errorSources,
  };
};

export const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const statusCode = 400;
  const match = err.message.match(/"([^"]*)"/);
  const extracted_msg = match && match[1];
  const errorSources: TErrorSources = [
    { path: "", message: ` ${extracted_msg} is already exists ` },
  ];
  return {
    statusCode,
    message: "Duplicated Error",
    errorSources,
  };
};

export const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const errorSources: TErrorSources = Object.values(err.errors).map((val) => {
    return {
      path: val.name,
      message: val.message,
    };
  });
  const statusCode = 400;
  return {
    statusCode,
    message: "validation Error",
    errorSources,
  };
};

export const handleZodError = (err: ZodError): TGenericErrorResponse => {
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
