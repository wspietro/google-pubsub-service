import { Message, PubSub } from '@google-cloud/pubsub'
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

  async publishMessageInTopic(topicNameOrId: string, message: any) {
    const dataBuffer = Buffer.from(message.data);
    const customAttributes = message.order

    try {
      const messageId = await this.pubSubClient
        .topic(topicNameOrId)
        .publishMessage({ data: dataBuffer, attributes: customAttributes });
      console.log(`Message ${messageId} published.`);
    } catch (error: any) {
      console.error(`Received error while publishing: ${error.message}`);
      process.exitCode = 1;
    }
  }

  async listenForMessagesInTopic(subscriptionNameOrId: string) {

    const subscription = this.pubSubClient.subscription(subscriptionNameOrId);

    const messageHandler = (message: Message) => {
      console.log(`Received message: ${message.data}:`);
      console.log(`\tAttributes: ${message.attributes}`);

      message.ack();

    };

    subscription.on('message', messageHandler);
  }
}