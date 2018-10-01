const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, conn) => {
	conn.createChannel((err, ch) => {
		let q = 'Garrosh';

		ch.assertQueue(q, {durable: false});

		ch.sendToQueue(q, new Buffer('Garrosh Hellscream'));
		console.log(" [x] Sent Message");

	});
});
