import { validationResult } from "express-validator";

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  return res.status(400).json({
    success: false,
    //this checks for all errors but displays their own message one at a time
    errors: errors.array({ onlyFirstError: true }).map((err) => ({
      field: err.path,
      message: err.msg,
    })),
  });
};
