import { FastifyInstance } from "fastify";
import { createOrder } from "./publish-messages";

// fastify plugin
export async function pubSubRoutes(app: FastifyInstance) {

  app.post("/order", createOrder);

}
