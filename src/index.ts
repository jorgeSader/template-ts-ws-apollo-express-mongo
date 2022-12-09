import bodyParser from 'body-parser';
import connectDB from './db';
import cors, { CorsRequest } from 'cors';
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { context } from './middleware';
import { createServer } from 'http';
import { expressMiddleware } from '@apollo/server/express4';
import { port, env, gqlPath } from './config/environment';
import { schema } from './graphql';
import { useServer } from 'graphql-ws/lib/use/ws';
import { WebSocketServer } from 'ws';

const start = async () => {
  //connect to Database
  console.log('Connecting...');
  await connectDB();
  console.log('🛢️  Connected to database...');

  // Create Http Server
  const app = await express();
  const httpServer = await createServer(app);

  // Create WebSocket (Subscriotions) Server
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: `${gqlPath}`,
  });
  const serverCleanup = useServer({ schema }, wsServer); // dispose

  // Create GraphQL Server
  const gqlServer = new ApolloServer({
    schema,
    introspection: env.development,
    // csrfPrevention: true, // TODO: read docs & setup properly
    plugins: [
      // Proper Shutdown of the Http Server
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        // Proper Shutdown of the WebSocket Server
        async serverWillStart() {
          return {
            async drainServer() {
              serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  // Start GraphQL Server
  await gqlServer.start();
  console.log(`✨ GraphQL Endpoints at http://localhost:${port}${gqlPath}`);

  // Run Middlewares
  app.use(
    `${gqlPath}`,
    cors<CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(gqlServer, {
      context,
    })
  );

  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  console.log(`🚀 Server running at http://localhost:${port}`);
};

start();
