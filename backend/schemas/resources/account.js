const accountTypeDef = `
  type Account {
    _id: ID!
    username: String!
    firstName: String!
    lastName: String!
    email: String!
    phone: String!
    gender: String!
    isAdmin: Boolean!
    updatedAt: String!
    createdAt: String!
  }

  input MinAccount {
    username: String!
    firstName: String!
    lastName: String!
    password: String!
    email: String!
    phone: String!
    gender: String!
    isAdmin: Boolean!
  }

  input EditAccount {
    username: String
    firstName: String
    lastName: String
    password: String
    email: String
    phone: String
    gender: String
    isAdmin: Boolean
  }

  type RegisteredAccount {
    account: Account!
    token: String!
  }
`

const accountQueries = `
  accounts: [Account]
  account(username: String!): Account
`;

const accountMutations = `
  addAccount(newAccount: MinAccount!): RegisteredAccount
  editAccount(username: String!, newInformations: EditAccount!): Account
  deleteAccount(username: String!): Account
`;

module.exports = { accountTypeDef, accountQueries, accountMutations };