import { celebrate, Segments, Joi } from "celebrate";

export const createProductSchema = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    price: Joi.number().positive().precision(2).required(),
    quantity: Joi.number().integer().positive().required(),
  }),
});

export const updateProductSchema = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string(),
    price: Joi.number().positive().precision(2).required(),
    quantity: Joi.number().integer().positive().required(),
  }),
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
});

export const IdParamsValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
});
