const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, conn) => {
	conn.createChannel((err, ch) => {
		let q = 'Guldan';

		ch.assertQueue(q, {durable: false});

		console.log(" [*] Waiting for qs in %s. To exit press CTRL+C", q);

		ch.consume(q, (msg) => {
			let secs = msg.content.toString().split('.').length - 1;

			console.log(' [x] Received %s', msg.content.toString());
			setTimeout(() => {
				console.log(' [x] Done');
			}, secs * 1000);
		}, {noAck: true});
	});
});
