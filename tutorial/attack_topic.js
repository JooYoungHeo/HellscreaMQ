const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, conn) => {
	conn.createChannel((err, ch) => {
		let ex = 'topic_logs';
		let args = process.argv.slice(2);
		let key = (args.length > 0)? args[0]: 'anonymous.info';
		let msg = args.slice(1).join(' ') || 'Garrosh';

		ch.assertExchange(ex, 'topic', {durable: false});

		ch.publish(ex, key, Buffer.from(msg));

		console.log(`[x] Sent ${key}: ${msg}`);
	});

	setTimeout(() => {
		conn.close();
		process.exit(0);
	}, 500);
});
