/* import joi from "joi";

const schemaPedidoProduto = joi.object({
  produto_id: joi.number().integer().positive().required().messages({
    "any.required": "O campo produto_id é obrigatório",
    "number.integer": "O campo produto_id deve ser um número inteiro",
    "number.positive": "O campo produto_id deve ser um número positivo",
  }),

  quantidade_produto: joi.number().integer().positive().required().messages({
    "any.required": "O campo quantidade_produto é obrigatório",
    "number.integer": "O campo quantidade_produto deve ser um número inteiro",
    "number.positive": "O campo quantidade_produto deve ser um número positivo",
  }),
});

const schemaPedido = joi.object({
  cliente_id: joi.number().integer().positive().required().messages({
    "any.required": "O campo cliente_id é obrigatório",
    "number.integer": "O campo cliente_id deve ser um número inteiro",
    "number.positive": "O campo cliente_id deve ser um número positivo",
  }),

  observacao: joi.string().allow(""),

  pedido_produtos: joi
    .array()
    .items(schemaPedidoProduto)
    .min(1)
    .required()
    .messages({
      "any.required":
        "O campo pedido_produtos é obrigatório e deve conter pelo menos um item",
      "array.min": "O pedido deve receber ao menos um produto.",
    }),
});

module.exports = schemaPedido;
 */
