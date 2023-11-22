import joi from "joi";

const schemaCustomer = joi.object({
  full_name: joi
    .string()
    .trim()
    .min(1)
    .pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s']+$/)
    .required()
    .messages({
      "string.pattern.base": "The name must contain only letters and spaces.",
      "any.required": "The name field is required",
      "string.empty": "The name field is required",
      "string.base": "The name field must be filled with text",
    }),

  email: joi.string().email().required().messages({
    "string.email": "The email field must contain a valid format",
    "any.required": "The email field is required",
    "string.empty": "The email field is required",
    "string.base": "The email field must be filled with text",
  }),

  contact: joi.string().allow(""),
  status: joi.boolean().allow(""),
  address: joi.string().allow(""),
  userLogin: joi.allow(""),
});

export default schemaCustomer;
