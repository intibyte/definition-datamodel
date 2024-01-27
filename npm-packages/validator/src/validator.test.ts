import { validateAgainstSchema } from '../src/validator'

describe('validateAgainstSchema', () => {
  it('should return valid for a valid datamodel', () => {
    const schema = {
      type: 'object',
      properties: {
        // Define your schema properties here
      },
    }

    const datamodel = {
      // Define a valid datamodel
    }

    const result = validateAgainstSchema(schema, datamodel)

    expect(result.valid).toBe(true)
    expect(result.errors).toBeUndefined()
  })

  it('should return invalid with errors for an invalid datamodel', () => {
    const schema = {
      type: 'object',
      properties: {
        // Define your schema properties here
      },
      additionalProperties: false
    }

    const datamodel = {
      // Define an invalid datamodel
      'a': 123
    }

    const result = validateAgainstSchema(schema, datamodel)

    expect(result.valid).toBe(false)
    expect(result.errors).not.toBeUndefined()
  })
})
