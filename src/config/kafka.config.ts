import { Kafka, KafkaConfig, Producer, Consumer, logLevel } from 'kafkajs';

// Equivalent to public static final String TOPIC_NAME = "view-count-topic";
export const TOPIC_NAME = 'view-count-topic';

// Read values from env or fallback to defaults (@Value defaults)
const bootstrapServers = (process.env.SPRING_KAFKA_BOOTSTRAP_SERVERS || 'localhost:9092').split(',');
export const GROUP_ID = process.env.SPRING_KAFKA_CONSUMER_GROUP_ID || 'view-count-consumer';

// Kafka Client configuration
const kafkaConfig: KafkaConfig = {
  clientId: 'view-count-service',
  brokers: bootstrapServers,
  logLevel: logLevel.INFO,
  retry: {
    initialRetryTime: 100,
    retries: 8,
  },
};

// Singleton Kafka Client
export const kafka = new Kafka(kafkaConfig);

/**
 * Equivalent to ProducerFactory & KafkaTemplate
 */
export class KafkaProducerFactory {
  private static producerInstance: Producer;

  public static async getProducer(): Promise<Producer> {
    if (!this.producerInstance) {
      this.producerInstance = kafka.producer();
      await this.producerInstance.connect();
      console.log(`Producer factory created with brokers: ${bootstrapServers.join(',')}`);
    }
    return this.producerInstance;
  }

  // Equivalent to kafkaTemplate.send()
  public static async send<T>(topic: string, key: string, payload: T): Promise<void> {
    const producer = await this.getProducer();
    await producer.send({
      topic,
      messages: [
        {
          key,
          value: JSON.stringify(payload), // Handles JSON serialization automatically
        },
      ],
    });
  }
}

/**
 * Equivalent to ConsumerFactory & ConcurrentKafkaListenerContainerFactory
 */
export class KafkaListenerContainerFactory {
  private consumer: Consumer;
  private concurrency: number;

  constructor(groupId: string = GROUP_ID, concurrency: number = 3) {
    this.concurrency = concurrency;
    // Consumer factory initialization
    this.consumer = kafka.consumer({
      groupId,
      allowAutoTopicCreation: true,
    });
  }

  // Equivalent to @KafkaListener container startup
  public async listen<T>(
    topic: string,
    messageHandler: (key: string | null, value: T) => Promise<void>
  ): Promise<void> {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic, fromBeginning: false });

    console.log(`KafkaListenerContainer started for topic: ${topic} with concurrency: ${this.concurrency}`);

    await this.consumer.run({
      partitionsConsumedConcurrently: this.concurrency, // setConcurrency(3)
      eachMessage: async ({ message }) => {
        const key = message.key ? message.key.toString() : null;
        const rawValue = message.value ? message.value.toString() : null;
        
        // Handles JSON deserialization automatically
        const parsedValue: T = rawValue ? JSON.parse(rawValue) : (null as unknown as T);

        await messageHandler(key, parsedValue);
      },
    });
  }

  public async disconnect(): Promise<void> {
    await this.consumer.disconnect();
  }
}