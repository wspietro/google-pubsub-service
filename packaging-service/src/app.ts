import fastify from "fastify";
import { pubSubRoutes } from "./routes/routes";

export const app = fastify()

app.register(pubSubRoutes)
