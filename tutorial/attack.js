const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, conn) => {
	conn.createChannel((err, ch) => {
		let q = 'Guldan';
		let message = process.argv.slice(2).join(' ') || 'Garrosh Hellscream';

		ch.assertQueue(q, {durable: false});

		ch.sendToQueue(q, Buffer.from(message), {persistent: true});
		console.log(" [x] Sent %s", message);

		setTimeout(() => {
			conn.close();
			process.exit(1);
		}, 500);
	});
});
