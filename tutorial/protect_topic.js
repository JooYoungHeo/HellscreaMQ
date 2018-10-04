const amqp = require('amqplib/callback_api');

let args = process.argv.slice(2);

amqp.connect('amqp://localhost', (err, conn) => {
	conn.createChannel((err, ch) => {
		let ex = 'topic_logs';

		ch.assertExchange(ex, 'topic', {durable: false});

		ch.assertQueue('', {exclusive: true}, (err, q) => {
			console.log('[*] Waiting for logs. To exit press CTRL+C');

			args.forEach(key => {
				ch.bindQueue(q.queue, ex, key);
			});

			ch.consume(q.queue, msg => {
				console.log(`[x] ${msg.fields.routingKey}: ${msg.content.toString()}`);
			}, {noAck: true});
		});
	});
});
