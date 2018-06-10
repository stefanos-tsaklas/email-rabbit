const amqplib  = require('amqplib/callback_api');
const config = require('../config');

amqplib.connect(config.amqp, function(err, connection) {

  if (err) {
    console.error("Error " + err.stack);
    return process.exit(1);
  }

  connection.createChannel(function(err, channel) {   
    let msg = process.argv.slice(2).join(' ') || "Hello World!";     
    channel.assertQueue(config.queue, {durable: false});    
    channel.sendToQueue(config.queue, new Buffer(msg), {persistent: true});
    console.log(" Message was sent %s", msg);
  });

  setTimeout(function() {connection.close(); process.exit(0) }, 500);
});
