import { FastifyInstance } from "fastify";
import { createPeriod } from "./publish-messages";

// fastify plugin
export async function pubSubRoutes(app: FastifyInstance) {

  app.post("/periods", createPeriod);

}
