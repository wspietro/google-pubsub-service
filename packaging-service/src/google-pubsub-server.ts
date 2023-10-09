import { PubSub } from '@google-cloud/pubsub'
import { validatedEnv } from './env';

const credentials = {
  client_email: validatedEnv.CLIENT_EMAIL,
  private_key: validatedEnv.PRIVATE_KEY,
}

const projectId = 'fastify-pub-sub'

export class GooglePubSubServer {
  private pubSubClient: PubSub;

  constructor() {
    this.pubSubClient = new PubSub({ projectId, credentials });
  }

  async publishMessageInTopic(topicNameOrId: string, data: string) {
    const dataBuffer = Buffer.from(data);

    try {
      const messageId = await this.pubSubClient
        .topic(topicNameOrId)
        .publishMessage({ data: dataBuffer });
      console.log(`Message ${messageId} published.`);
    } catch (error: any) {
      console.error(`Received error while publishing: ${error.message}`);
      process.exitCode = 1;
    }
  }

  async listenForMessagesInTopic(subscriptionNameOrId: string) {

    const subscription = this.pubSubClient.subscription(subscriptionNameOrId);

    let messageCount = 0;
    const messageHandler = (message: any) => {
      console.log(`Received message: ${message.data}:`);
      console.log(`\tAttributes: ${message.attributes}`);
      messageCount += 1;

      message.ack();
    };

    subscription.on('message', messageHandler);
  }
}