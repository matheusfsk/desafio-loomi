import joi from "joi";

const schemaProduct = joi.object({
  description: joi.string().trim().min(1).required().messages({
    "any.required": "The description field is required",
    "string.empty": "The description field is required",
    "string.base": "The description field must be filled with text",
  }),

  name: joi.string().trim().min(1).required().messages({
    "any.required": "The name field is required",
    "string.empty": "The name field is required",
    "string.base": "The name field must be filled with text",
  }),

  amount: joi.number().required().messages({
    "any.required": "The amount field is required",
    "number.empty": "The amount field is required",
    "number.base": "The amount field must be filled with number",
  }),

  price: joi.number().required().messages({
    "any.required": "The price field is required",
    "number.empty": "The price field is required",
    "number.base": "The price field must be filled with number",
  }),

  category_id: joi.number().required().messages({
    "any.required": "The category_id field is required",
    "number.empty": "The category_id field is required",
    "number.base": "The category_id field must be filled with number",
  }),

  image: joi.string().allow(""),
  userLogin: joi.allow(""),
});

export default schemaProduct;
