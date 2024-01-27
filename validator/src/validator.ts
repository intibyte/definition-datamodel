import Ajv, { ValidateFunction } from 'ajv'

interface ValidationResult {
  valid: boolean;
  errors?: ValidateFunction['errors'];
}

export function validateAgainstSchema (schema: object, datamodel: any): ValidationResult {
  const ajv = new Ajv({ allErrors: true })
  const validate = ajv.compile(schema)
  const isValid = validate(datamodel)

  return {
    valid: isValid,
    ...(isValid ? {} : { errors: validate.errors }),
  }
}
