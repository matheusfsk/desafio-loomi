import * as joi from "joi";

const schemaLogin = joi.object({
  email: joi.string().email().required().messages({
    "string.email": "The email field must contain a valid format",
    "any.required": "The email field is required",
    "string.empty": "The email field is required",
    "string.base": "The email field must be filled with text",
  }),

  password: joi.string().required().messages({
    "any.required": "The password field is required",
    "string.empty": "The password field is required",
    "string.base": "The password field must be filled with text",
  }),
});

export default schemaLogin;
