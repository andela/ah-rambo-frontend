import Joi from 'joi-browser';
import setCustomMessage from '../helpers/validationHelper';

export default {
  password: Joi.string()
    .required()
    .min(8)
    .max(254)
    .regex(/\s/, { invert: true })
    .error(setCustomMessage('password')),
  confirmPassword: Joi.string()
    .required()
    .valid(Joi.ref('password'))
    .error(setCustomMessage('confirm password')),
};
