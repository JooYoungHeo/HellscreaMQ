const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, conn) => {
	conn.createChannel((err, ch) => {
		let ex = 'direct_logs';
		let args = process.argv.slice(2);
		let msg = args.slice(1).join(' ') || 'Hellscream Q';
		let severity = (args.length > 0)? args[0]: 'info';
			
		ch.assertExchange(ex, 'direct', {durable: false});
		ch.publish(ex, severity, Buffer.from(msg));

		console.log(`[x] Sent ${severity}: ${msg}`);
	});

	setTimeout(() => {
		conn.close();
		process.exit(0);
	}, 500);
});
