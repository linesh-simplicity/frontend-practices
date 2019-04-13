import { Flag } from './flag'
import { BooleanFlag } from './flag/boolean'
import { IntegerFlag } from './flag/integer'
import { StringFlag } from './flag/string'

function createFlagFactory(flag, schemas) {
  const [name, value] = flag.split(' ')
  const schema = schemas.findSchema(name)
  const defaultValue = schema.getDefaultValue()

  switch (schema.getType()) {
    case 'boolean':
      return new BooleanFlag(name, true, defaultValue)
    case 'integer':
      return new IntegerFlag(name, value, defaultValue)
    case 'string':
      return new StringFlag(name, value, defaultValue)
    default:
      return new Flag(name, value)
  }
}

export class Flags {
  constructor(flags, schemas) {
    this._value = flags.map((flag) => createFlagFactory(flag, schemas))
  }

  findFlag(alias) {
    return this._value.find((flag) => flag.getName() === alias)
  }
}
