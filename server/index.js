const amqp = require('amqplib/callback_api');
const nodemailer = require('nodemailer');
const config = require('../config');

if (!config.emailServiceUsername || config.emailServicePassword) {
    return console.error("You must configure the email sender service first!");
}

// configure transporter to send email
var transporter = nodemailer.createTransport({
    service: config.emailService,
    auth: {
           user: config.emailServiceUsername,
           pass: config.emailServicePassword
       }
});

// configure template of email
const defaultMailOptions = {
    from: config.emailSenderAddress, // sender address
    to: config.emailRecipientAddress, // list of receivers,
    replyTo: config.emailReplyToAddress, // the address to reply to
    subject: config.emailSubject, // Subject line
};

// method that sends email
const sendEmail = (message) => {
    transporter.sendMail(Object.assign(defaultMailOptions, {html: message}), (error, info) => {
        if (error) {
            return console.log(error);
        } else {
            console.log(` [X] Message sent: ${info.messageId}`);
        }
    });
}

// launch the consumer which will pick up messages and send emails
amqp.connect(config.amqp, (err, conn) => {
    conn.createChannel((err, channel) => {
        const q = config.queue;
        channel.assertQueue(q, {durable: false});

        console.log(` [*] Waiting for messages in ${q}. To exit press CTRL+C"`);
        channel.consume(q, (msg) => {
            console.log(` [X] Received ${msg.content}`);
            setTimeout(() => sendEmail(msg), config.emailDelayMs);
        }, {noAck: true});
    });
});