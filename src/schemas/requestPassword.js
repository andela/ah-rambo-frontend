import Joi from 'joi-browser';
import setCustomMessage from '../helpers/validationHelper';

export default {
  email: Joi.string()
    .required()
    .min(3)
    .max(254)
    .regex(/^[\w._]+@[\w]+[-.]?[\w]+\.[\w]+$/)
    .error(setCustomMessage('email')),
};
