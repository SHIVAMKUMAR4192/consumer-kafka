const { Kafka } = require ("kafkajs")

const kafka = new Kafka ({
  clientId: "kafka-consumer-client",
  brokers: ["localhost:9092"]
})


const consumer = kafka.consumer({ groupId: "my-group" })

const consumeMessages = async ()=>{
    await consumer.connect()
    await consumer.subscribe({ topic: "my-topic", fromBeginning: true })
    await consumer.run({
      eachMessage: async ({  message }) => {
        const value = message.value.toString
        console.log(`Received message: ${value}`);      }
    })
}

consumeMessages();