# Data Model JSON Schema Validator

## Purpose

Responsible for validating input data model (JSON file) against specified JSON Schema (data model specification).

## Architecture

Validator is a npm package written in TypeScript.

## Install

```bash2
$ yarn add ... // TODO
```

## Usage

```ts
import { validate } from './validator' // './validator' mich be different

const myDataModel = { /* define some datamodel here */ }

const result = validate(myDataModel)

result.valid // true / false
result.schemaVersion // e.g. 1.0
result.errors // errors
```

## Test

```bash2
$ yarn
$ yarn test
```
