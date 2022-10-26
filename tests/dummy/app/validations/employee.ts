import {
  validatePresence,
  validateLength,
  validateConfirmation,
  validateFormat,
} from 'ember-changeset-validations/validators';

export default {
  firstName: [validatePresence(true), validateLength({ min: 4 })],
  lastName: validatePresence(true),
  email: validateFormat({ type: 'email' }),
  password: [validateLength({ min: 8 })],
  passwordConfirmation: validateConfirmation({ on: 'password' }),
};
