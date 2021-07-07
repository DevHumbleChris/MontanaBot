require("dotenv").config()
const client = require('twilio')(process.env.accountSid, process.env.authToken);

client.messages
      .create({
         body: 'This Message Is Sent From The Console',
         from: 'whatsapp:+14155238886',
         to: 'whatsapp:+254768879348'
       })
      .then(message => console.log(message.sid))
      .done();
