Prerequisites:
- Node, npm, rabbitmq running

Installation:
    - Checkout project
    - npm install
    - Fill in the configuration file in config.json, specifically the credentials of the service that will send the email. We tested with gmail, and needed to allow allow access to less secure apps, go to link: https://myaccount.google.com/lesssecureapps 
    - Run a consumer of the queue:
        node server/index.js
    - Run a producer of the queue:
        node client/index.js This is really funny stuff!
    - Check the email that you configured in config.emailRecipientAddress, you should have received an email.


Demo:
    Attached a gif demonstrating the system.
