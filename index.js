import express from "express";
import { ApolloServer } from "apollo-server-express";
import { gql } from "apollo-server-express";
import { connectDB } from "./conexion/conexion.mjs";
import { getAll, getById, getBetweenCalories, Create, Update, Delete } from "./resolvers/resolver.mjs";

connectDB();

const typeDefs = gql`
  type Dish {
    id: ID!
    idDish: String!
    name: String!
    calories: Int!
    isVegetarian: Boolean!
    value: Int!
    comments: String
  }

  type Query {
    dishes: [Dish]
    dish(id: ID!): Dish
    getBetweenCalories(min: Int!, max: Int!): [Dish]
  }

  type Mutation {
    createDish(
      idDish: String!
      name: String!
      calories: Int!
      isVegetarian: Boolean!
      value: Int!
      comments: String
    ): Dish

    updateDish(
      id: ID!
      name: String
      calories: Int
      isVegetarian: Boolean
      value: Int
      comments: String
    ): Dish

    deleteDish(id: ID!): Dish
  }
`;

const resolvers = {
  Query: {
    dishes: async () => await getAll(),
    dish: async (_, { id }) => await getById(id),
    getBetweenCalories: async (_, { min, max }) => await getBetweenCalories(min, max),
  },
  Mutation: {
    createDish: async (_, args) => await Create(args),
    updateDish: async (_, { id, ...data }) => await Update(id, data),
    deleteDish: async (_, { id }) => await Delete(id),
  },
};

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

const startServer = async () => {
  await server.start();
  server.applyMiddleware({ app, path: "/" });

  app.listen(4000, () => {
    console.log("✅ Conectado a MongoDB Atlas correctamente");
    console.log("🚀 Servidor GraphQL listo en: http://localhost:4000/");
  });
};

startServer();
