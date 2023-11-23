import joi from "joi";

enum statusType {
  confirm = "confirm",
  deny = "deny",
}

const schemaStatusPayment = joi.object({
  payment: joi
    .string()
    .trim()
    .valid(statusType.confirm, statusType.deny)
    .required()
    .messages({
      "any.required": "The payment field is required.",
      "string.empty": "The payment field is required.",
      "string.base": "The payment field must be filled with text.",
      "any.only": "The payment must be either 'confirm' or 'deny'.",
    }),

  userLogin: joi.allow(""),
});

export default schemaStatusPayment;
