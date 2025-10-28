import express from "express";
import { ApolloServer } from "apollo-server-express";
import { gql } from "apollo-server-express";
import { getAll, getById, Update } from "./resolvers/resolver.mjs";

const typeDefs = gql`
  type Dish {
    id: ID!
    name: String!
    price: Float!
  }

  type Query {
    dishes: [Dish]
    dish(id: ID!): Dish
  }

  type Mutation {
    updateDish(id: ID!, name: String, price: Float): Dish
  }
`;

const resolvers = {
  Query: {
    dishes: () => getAll(),
    dish: (_, { id }) => getById(id),
  },
  Mutation: {
    updateDish: (_, { id, name, price }) => Update(id, name, price),
  },
};

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

await server.start();

server.applyMiddleware({ app, path: "/" });

app.listen(4000, () => {
  console.log("🚀 Servidor listo en http://localhost:4000/");
});
