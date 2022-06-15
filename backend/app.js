const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const typeDefs = require("./schemas/schema");
const resolvers = require("./schemas/resolvers");
const mongoose = require("mongoose");
const cors = require("cors");
const context = require("./context");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
mongoose
  .connect(
    `${process.env.ATLAS_URL}`,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
  .then(() => console.log("Connection to MongoDB succeeded"))
  .catch((_) => console.log("Connection to MongoDB failed"));

const app = express();
app.use(cors());

const server = new ApolloServer({
  cors: false,
  typeDefs,
  resolvers,
  playground: {
    endpoint: "/graphql",
  },
  context,
});

server.applyMiddleware({ app, cors: false });

module.exports = app;
