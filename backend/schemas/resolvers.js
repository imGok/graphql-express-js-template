const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const jwt = require("jsonwebtoken");

const Account = require("../models/account");

const resolvers = {
  Query: {
    // Login
    async getAuthorized(_, args, { loggedInUser }) {
      const account = await Account.findOne({ username: loggedInUser });
      if (!account) {
        throw new Error("Wrong token.");
      }

      return await account;
    },

    // Accounts
    async accounts(_, args, { loggedInUser }) {
      if (!loggedInUser) {
        throw new Error("You're not logged in!");
      }

      return await Account.find();
    },

    async account(_, args, { loggedInUser }) {
      if (!loggedInUser) {
        throw new Error("You're not logged in!");
      }

      return await Account.findOne({ username: args.username });
    },
  },

  Mutation: {
    // Login
    async login(_, { username, password }) {
      const account = await Account.findOne({ username: username });

      if (!account) {
        throw new Error(
          "This account doesn't exist. Please, make sure to type the right login."
        );
      }

      const valid = await bcrypt.compare(password, account.password);

      if (!valid) {
        throw new Error("Your password is incorrect!");
      }

      return {
        account: account,
        token: jsonwebtoken.sign(
          { username: account.username },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          }
        ),
      };
    },

    // Accounts
    async addAccount(_, args, { loggedInUser }) {
      if (!loggedInUser) {
        throw new Error("You're not logged in!");
      }

      const loggedAccount = await Account.findOne({ username: loggedInUser });

      if (!loggedAccount.isAdmin) {
        throw new Error("You're not admin");
      }

      const account = await Account.create({
        ...args.newAccount,
        password: await bcrypt.hash(args.newAccount.password, 10),
      });

      return {
        account: account,
        token: jsonwebtoken.sign(
          { username: account.username },
          process.env.JWT_SECRET,
          {
            expiresIn: "3m",
          }
        ),
      };
    },

    async editAccount(_, args, { loggedInUser }) {
      if (!loggedInUser) {
        throw new Error("You're not logged in!");
      }

      const loggedAccount = await Account.findOne({ username: loggedInUser });

      if (!loggedAccount.isAdmin) {
        throw new Error("You're not admin");
      }

      await Account.updateOne(
        { username: args.username },
        {
          ...args.newInformations,
        }
      );

      return await Account.findOne({ username: args.username });
    },

    async deleteAccount(_, args, { loggedInUser }) {
      if (!loggedInUser) {
        throw new Error("You're not logged in!");
      }

      const loggedAccount = await Account.findOne({ username: loggedInUser });

      if (!loggedAccount.isAdmin) {
        throw new Error("You're not admin");
      }

      return await Account.findOneAndDelete({
        username: args.username,
      });
    },
  },
};

module.exports = resolvers;
