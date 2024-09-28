import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();


import { connectDatabase } from "./config/database";

import { ApolloServer, gql } from "apollo-server-express";

import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";

// Graphql
const startServer = async () => {
    connectDatabase();

    const app: Express = express();
    const port: number = 3003;

    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers
    });
    
    await apolloServer.start();
    
    apolloServer.applyMiddleware({
        app: app,
        path: "/graphql"
    });

    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    });
}

startServer();