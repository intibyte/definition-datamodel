import Ajv, { ValidateFunction } from 'ajv'
import SCHEMA__1_0 from '../../data-model-json-schema/1.0.json'

type Schema = object
type DataModel = any
type SchemaVersion = '1.0' | 'UNKNOWN'

interface ValidationResult {
  valid: boolean
  schemaVersion: SchemaVersion
  errors?: ValidateFunction['errors']
}

export function determineSchemaVersionFromDataModel (dataModel: DataModel): SchemaVersion {
  return (dataModel?.spec_version === '1.0')
    ? '1.0'
    : 'UNKNOWN'
}

export function getSchema (schemaVersion: SchemaVersion | any): Schema {
  if (schemaVersion === '1.0') {
    return SCHEMA__1_0
  }

  throw new Error('Unknown schema version')
}

export function validateAgainstSchema (schema: Schema, dataModel: DataModel): ValidationResult {
  const ajv = new Ajv({ allErrors: true })
  const validate = ajv.compile(schema)
  const isValid = validate(dataModel)

  return {
    valid: isValid,
    schemaVersion: determineSchemaVersionFromDataModel(dataModel),
    ...(isValid ? {} : { errors: validate.errors }),
  }
}

export function validate (dataModel: DataModel): ValidationResult {
  const schemaVersion: SchemaVersion = determineSchemaVersionFromDataModel(dataModel)

  if (schemaVersion === 'UNKNOWN') {
    return {
      valid: false,
      schemaVersion,
    }
  }

  const schema: Schema = getSchema(schemaVersion)

  return validateAgainstSchema(schema, dataModel)
}
