const inversify = require('inversify');
const Ajv = require('ajv');

class Validation {
  buildValidator(schema) {
    const ajv = new Ajv({});
    return async (data) => {
      const validate = ajv.compile(schema);
      const valid = validate(data);
      if (!valid) {
        const error = validate.errors[0];
        throw new Error(`${error.dataPath.replace('.', '')} ${error.message}`);
      }
    };
  }
}

inversify.decorate(inversify.injectable(), Validation);

module.exports = Validation;
