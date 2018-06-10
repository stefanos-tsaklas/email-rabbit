*Prerequisites*

- Node, npm, rabbitmq running


*Installation*:


- Checkout project
```console
foo@bar:~$ git clone https://github.com/stefanos-tsaklas/email-rabbit
```
- Install dependencies
```console
foo@bar:~$ npm install
```

- Fill in the configuration file in config.json, specifically the credentials of the service that will send the email. We tested with gmail, and needed to allow allow access to less secure apps, go to link: https://myaccount.google.com/lesssecureapps 
- Run a consumer of the queue:
```console
foo@bar:~$ node server/index.js
```  
- Run a producer of the queue:
```console
foo@bar:~$ node client/index.js This is really funny stuff!
```  
 - Check the email that you configured in config.emailRecipientAddress, you should have received an email.


*More work*
- Add tests
- Test failures and more email providers, currently only tested with gmail.
