import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { buildSchema } from "type-graphql";
import { verify } from "jsonwebtoken";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';

import http from "http";
import express from "express";
import { json } from "body-parser";
import cors from "cors";
import resolvers from "./resolvers/index"
import entities from "./entities/index"
import { User } from "./entities/user";
import cookieParser from "cookie-parser";


dotenv.config();
const PORT = process.env.PORT || 7000;
const node_env = process.env.NODE_ENV || "development";
const corsOrigin = ["http://localhost:8000", "http://localhost:3001", "http://localhost:3000", "https://competitions.saarang.org", "https://join.saarang.org","https://saarang.org"];
async function bootstrap() {
  const schema = await buildSchema({
    resolvers: resolvers,
    validate: { forbidUnknownValues: false }
  });

  const app = express()
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer }),
    // ...(node_env === 'development' ? [] : [ApolloServerPluginLandingPageDisabled()])
    ],
    // introspection: true,
  });
  await server.start();
  app.use("/graphql",
    cors<cors.CorsRequest>(
      {
        origin: corsOrigin,
        credentials: true,
      }
    ),
    cookieParser(),
    json(),

    expressMiddleware(server, {
      context: async ({ req, res }: { req: express.Request; res: express.Response }) => {
        let user = null;

        if (req.cookies["token"]) {
          try {
            const token = req.cookies["token"];
            const decoded = verify(token, String(process.env.JWT_KEY)) as any;
            user = await User.findOneOrFail({where:{ id: decoded.id }});
          } catch (error) {
            console.error("Error in token verification or user fetching:", error);
          }
        } else {
          // console.log('No token found in cookies');
        }

        return { req, res, user };
      },
    })
  );
  app.use(express.json());


  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  );
  console.log(`Server ready at http://localhost:${PORT}/graphql`);

}
const connection = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  entities,
  synchronize: true,
  logging: true,
  ssl: false,
  //   extra: {
  // ssl: {
  // 	ca: process.env.cert,
  // 	rejectUnauthorized: false,
  // }
  //   }
})

connection.initialize()
  .then(() => {
    console.log("Data Source has been initialized");
    bootstrap();
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });


