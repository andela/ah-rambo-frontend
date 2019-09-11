import Joi from 'joi-browser';
import setCustomMessage from '../helpers/validationHelper';

export default {
  comment: Joi.string()
    .required()
    .min(2)
    .max(5000)
    .error(setCustomMessage('comment'))
};
