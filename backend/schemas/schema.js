const { gql } = require("apollo-server-express");

const { accountTypeDef, accountQueries, accountMutations } = require("./resources/account")
const { authentificationTypeDef, authentificationQueries, authentificationMutations } = require("./resources/authentification");

const typeDefs = gql`
    ${accountTypeDef}
    ${authentificationTypeDef}

    type Query {
      ${accountQueries}
      ${authentificationQueries}
    }

    type Mutation {
      ${accountMutations}
      ${authentificationMutations}
    }
`;

module.exports = typeDefs;