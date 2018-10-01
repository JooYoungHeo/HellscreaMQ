const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, conn) => {
	conn.createChannel((err, ch) => {
		let q = 'Garrosh';

		ch.assertQueue(q, {durable: false});

		console.log(" [*] Waiting for qs in %s. To exit press CTRL+C", q);

		ch.consume(q, (msg) => {
			console.log(' [x] Received %s', msg.content.toString());
		}, {noAck: true});
	});
});
