const inversify = require('inversify');
const Ajv = require('ajv');

class Validation {
  buildValidator(schema) {
    const ajv = new Ajv({});
    return async (data) => {
      const validate = ajv.compile(schema);
      const valid = validate(data);
      if (!valid) {
        const err = validate.errors[0];
        const error = new Error(`${err.dataPath.replace('.', '')} ${err.message}`);
        error.status = 400;
        throw error;
      }
    };
  }
}

inversify.decorate(inversify.injectable(), Validation);

module.exports = Validation;
