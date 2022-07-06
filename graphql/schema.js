var { buildSchema } = require("graphql");

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    rollDice(numDice: Int!, numSides: Int): [Int]
  }
`);

module.exports = {
  schema,
};
