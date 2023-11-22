import joi from "joi";

enum userType {
  admin = "admin",
  customer = "customer",
}

const schemaUser = joi.object({
  name: joi
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
    "string.email": "O campo email precisa conter um formato válido",
    "any.required": "O campo email é obrigatório",
    "string.empty": "O campo email é obrigatório",
    "string.base": "O campo email deve ser preenchido com um texto",
  }),

  password: joi.string().required().messages({
    "any.required": "The password field is required",
    "string.empty": "The password field is required",
    "string.base": "The password field must be filled with text",
  }),

  user_type: joi
    .string()
    .trim()
    .valid(userType.admin, userType.customer)
    .required()
    .messages({
      "any.required": "The user_type field is required",
      "string.empty": "The user_type field is required",
      "string.base": "The user_type field must be filled with text",
      "any.only": "The user_type must be either 'admin' or 'customer'",
    }),

  userLogin: joi.allow(""),
});

export default schemaUser;
