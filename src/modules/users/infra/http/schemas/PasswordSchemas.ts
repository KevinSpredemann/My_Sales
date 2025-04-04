import { celebrate, Segments, Joi } from "celebrate";


export const ForgotPasswordSchema = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
});

export const ResetPasswordSchema = celebrate({
  [Segments.BODY]: Joi.object().keys({
    token: Joi.string().uuid().required(),
    password: Joi.string().required(),
    password_confirmation: Joi.string().required().valid(Joi.ref('password')),
  }),
});
