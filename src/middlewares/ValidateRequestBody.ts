import * as joi from "joi";
import { Request, Response, NextFunction } from "express";

interface JoiValidationError extends joi.ValidationError {
  message: string;
}

const ValidateRequestBody =
  (joiSchema: joi.ObjectSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await joiSchema.validateAsync(req.body);
      next();
    } catch (error) {
      const joiError = error as JoiValidationError;
      return res.status(400).json({ message: joiError.message });
    }
  };

export default ValidateRequestBody;
