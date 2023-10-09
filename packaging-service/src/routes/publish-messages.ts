import { FastifyRequest, FastifyReply } from "fastify";
import { GooglePubSubServer } from "../google-pubsub-server";

export async function createSync(request: FastifyRequest, reply: FastifyReply) {
  const dataMessage = JSON.stringify(request.body);

  const topicNameOrId = 'projects/fastify-pub-sub/topics/ConfigData';

  const pubSubServer = new GooglePubSubServer();
  await pubSubServer.publishMessageInTopic(topicNameOrId, dataMessage)

  return reply.status(201).send();
}
