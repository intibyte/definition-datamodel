# CRUD Module

This module consists of the following parts:

## Data Model JSON Schema

Located in `json-schema` folder.

Contains JSON Schema files for data model specification.

## Data Model Specification

Located in `specification` folder.

Contains MD files intended for people.

## Data Model Examples

Located in `examples` folder.

Contains example data models.

## Data Model Validator

### Purpose

Responsible for validating input data model (JSON file) against specified JSON Schema (data model specification).

### Architecture

Validator is a npm package written in TypeScript.

### Usage

```ts
import { validate } from './validator' // './validator' mich be different

const myDataModel = { /* define some datamodel here */ }

const result = validate(myDataModel)

result.valid // true / false
result.schemaVersion // e.g. 1.0
result.errors // errors
```

## Data Model Vue Manager Component

TODO
