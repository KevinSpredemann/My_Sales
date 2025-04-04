import { celebrate, Segments, Joi } from 'celebrate';

export const idParamsValidate = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().required(),
  },
});

export const createCostumerSchema = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
  },
});

export const updateCostumerSchema = celebrate({
  [Segments.BODY]: {
    name: Joi.string(),
    email: Joi.string().email(),
  },
});
