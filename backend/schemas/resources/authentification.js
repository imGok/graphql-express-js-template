const authentificationTypeDef = `
type ConnectedAccount {
  _id: ID!
  username: String!
  firstName: String!
  lastName: String!
  email: String!
  phone: String!
  gender: String!
  password: String!
  isAdmin: Boolean!
  updatedAt: String!
  createdAt: String!
}

  type Auth {
    account: ConnectedAccount!
    token: String!
  }
`

const authentificationQueries = `
  getAuthorized: ConnectedAccount
`

const authentificationMutations = `
  login(username: String!, password: String!): Auth
`;

module.exports = { authentificationTypeDef, authentificationQueries, authentificationMutations };