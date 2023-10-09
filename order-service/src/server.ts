import { app } from './app'
import { validatedEnv } from './env'
import { GooglePubSubServer } from './google-pubsub-server'

app.listen({
  host: '0.0.0.0',
  port: validatedEnv.PORT,
}).then(() => {
  console.log('🚀 Alfredo OOPS Running')
})

const consumer = async () => {
  const pubSubServer = new GooglePubSubServer();
  await pubSubServer.listenForMessagesInTopic('projects/fastify-pub-sub/subscriptions/ConfigData-sub');
}

consumer();