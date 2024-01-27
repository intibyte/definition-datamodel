import Ajv, { ValidateFunction } from 'ajv'

type Schema = object
type DataModel = any
type SchemaVersion = '1.0' | 'UNKNOWN'

interface ValidationResult {
  valid: boolean
  schemaVersion: SchemaVersion
  errors?: ValidateFunction['errors']
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

export function determineSchemaVersionFromDataModel (dataModel: DataModel): SchemaVersion {
  return (dataModel?.spec_version === '1.0')
    ? '1.0'
    : 'UNKNOWN'
}

export function getSchema (schemaVersion: SchemaVersion): Schema {
  if (schemaVersion === 'UNKNOWN') {
    throw new Error('Unknown schema version')
  }

  // download schema
  // throw exception if cant
  // alebo nebude downloadovat? bude to mat ulozene staticky?

  // 1.0
  return {
    // TODO
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

  const schema: Schema | null = getSchema(schemaVersion)

  return validateAgainstSchema(schema, dataModel)
}
