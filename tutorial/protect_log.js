const amqp = require('amqplib/callback_api');

let args = process.argv.slice(2);

amqp.connect('amqp://localhost', (err, conn) => {
	conn.createChannel((err, ch) => {
		let ex = 'direct_logs';

		ch.assertExchange(ex, 'direct', {durable: false});

		ch.assertQueue('', {exclusive: true}, (err, q) => {
			console.log('[*] Waiting for logs. To exit press CTRL+C');

			args.forEach(severity => {
				ch.bindQueue(q.queue, ex, severity);
			});

			ch.consume(q.queue, msg => {
				console.log(`[x] ${msg.fields.routingKey}: ${msg.content.toString()}`);
			}, {noAck: true});
		});
	});
});
