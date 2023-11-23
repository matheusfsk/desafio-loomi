import joi from "joi";

enum statusType {
  received = "received",
  in_preparation = "in_preparation",
  dispatched = "dispatched",
  delivered = "delivered",
}

const schemaUpdateStatus = joi.object({
  order_status: joi
    .string()
    .trim()
    .valid(
      statusType.received,
      statusType.in_preparation,
      statusType.dispatched,
      statusType.delivered
    )
    .required()
    .messages({
      "any.required": "The order_status field is required",
      "string.empty": "The order_status field is required",
      "string.base": "The order_status field must be filled with text",
      "any.only":
        "The order_status must be either 'received', 'in_preparation', 'dispatched' or 'delivered'",
    }),

  userLogin: joi.allow(""),
});

export default schemaUpdateStatus;
