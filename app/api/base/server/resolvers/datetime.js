import { GraphQLScalarType } from 'graphql';

const DateTime = new GraphQLScalarType({
  name: 'DateTime',
  description: 'A valid date time value',
  parseValue: value => new Date(value),
  serialize: value => new Date(value).toISOString(),
  parseLiteral: ast => ast.value,
});

export default DateTime;
