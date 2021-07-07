// const MessagingResponse = require("twilio").twiml.MessagingResponse
// const response = new MessagingResponse()

require("dotenv").config()
const client = require('twilio')(process.env.accountSid, process.env.authToken);

module.exports = {
  getUserRequest: (req, res) => {
    client.messages
          .create({
             body: `This Message Is Sent From The Console ${req.body.MessageSid} Love`,
             from: 'whatsapp:+14155238886',
             to: 'whatsapp:+254768879348'
           })
          .then(message => console.log(message.sid))
          .done();
  }
}
