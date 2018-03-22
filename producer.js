const kafka = require('kafka-node');
const lineReader = require('line-reader');

const client = new kafka.KafkaClient({
        kafkaHost: "192.168.0.125:9092",
        autoConnect: true
});

client.on('error', (err) => console.error(err));
client.on('ready', () => console.log("kafka client is ready"));

const producer = new kafka.HighLevelProducer(client);

producer.on("ready", () => {
    console.log("Kafka Producer is connected and ready");
});

producer.on("error", (error) => {
    console.log(error)
});

function count(counter) {
    return new Promise((resolve, reject) => {
        lineReader.eachLine('data.txt', (line, last) => {
            const record = [
                {
                    topic: "test",
                    messages: line,
                    attributes: 1 /* Use GZip compression for the payload */
                }
            ];
            producer.send(record, (err, data) => {
                if (err) return reject(err);
                counter++;
                if (last) return resolve(counter);
            });
        });
    })
}

const KafkaService = () => {
    async function main() {
        const counter = await count(0);
        console.log(counter);
    }

    main()
        .catch(err => console.error(err));

    // console.log('KafkaService started:');
    // const record = [
    //     {
    //         topic: "test",
    //         messages: "123",
    //         attributes: 1 /* Use GZip compression for the payload */
    //     }
    // ];
    //
    // producer.send(record, (err, data) => {
    //     if (err) {
    //         console.log('Error:', err);
    //         return
    //     }
    //     console.log('Message sent:');
    // });

};

module.exports = KafkaService;