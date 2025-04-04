import { celebrate, Segments, Joi } from 'celebrate';

export const idParamsValidate = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
});

export const createOrderValidate = celebrate({
  [Segments.BODY]: Joi.object().keys({
    costumer_id: Joi.string().required(),
    products: Joi.required(),
  }),
});
