import joi from "joi";

const schemaOrder = joi.object({
  order_items: joi
    .array()
    .required()
    .messages({
      "any.required":
        "Array order_items field is required with product_id and amount.",
      "array.empty":
        "Array order_items field is required with product_id and amount.",
      "array.base": "The order_items field must be filled with object array",
    })
    .items({
      product_id: joi.number().required().messages({
        "any.required": "The product_id field is required",
        "number.empty": "The product_id field is required",
        "number.base": "The product_id field must be filled with number",
      }),

      amount: joi.number().required().messages({
        "any.required": "The amount field is required",
        "number.empty": "The amount field is required",
        "number.base": "The amount field must be filled with number",
      }),
    }),

  userLogin: joi.allow(""),
});

export default schemaOrder;
