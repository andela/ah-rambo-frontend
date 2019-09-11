/* eslint-disable default-case */
const setCustomMessage = (label, action = 'user signup') => (errors) => {
  errors.forEach((err) => {
    switch (err.type) {
      case 'any.empty':
        err.message = `${label} is required`;
        break;
      case 'any.allowOnly':
        err.message = `${label} does not match password`;
        break;
      case 'string.alphanum':
        err.message = `${label} should contain only letters and numbers`;
        break;
      case 'string.min':
        err.message = `${label} should not be less than ${err.context.limit} characters`;
        break;
      case 'string.max':
        err.message = `${label} should not be more than ${err.context.limit} characters`;
        break;
      case 'string.regex.base':
        err.message = `${label} is invalid`;
        break;
      case 'string.regex.invert.base':
        err.message = `${label} should not contain spaces`;
        break;
    }
  });

  return errors;
};

export default setCustomMessage;
