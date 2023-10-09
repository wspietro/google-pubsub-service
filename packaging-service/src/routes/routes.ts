import { FastifyInstance } from "fastify";
import { createSync } from "./publish-messages";

// fastify plugin
export async function pubSubRoutes(app: FastifyInstance) {

  app.post("/config", createSync);

}
