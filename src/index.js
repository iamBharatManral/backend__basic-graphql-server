const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const app = express();
const { readFileSync } = require("fs");
const path = require("path");

app.use(express.json());

const typeDefs = gql(
  readFileSync(path.join(__dirname, "userSchema.graphql"), {
    encoding: "utf-8"
  })
);

const resolvers = require("./resolvers");

const startServer = async () => {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });
};

startServer();

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(9000);
