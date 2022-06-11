const Account = require("../models/account");
const mockData = require("../helpers/mock-data.json");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

exports.mocking = async () => {
  mongoose.connection.collections["accounts"].drop();
  mockData.accounts.forEach(async (account) => {
    Account.create({
      ...account,
      password: await bcrypt.hash(account.password, 10),
    });
  });
};
