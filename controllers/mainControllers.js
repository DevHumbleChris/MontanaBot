const MessagingResponse = require("twilio").twiml.MessagingResponse
const response = new MessagingResponse()

require("dotenv").config()
const client = require('twilio')(process.env.accountSid, process.env.authToken);

module.exports = {
  getUserRequest: (req, res) => {
    // console.log(process.env.accountSid)
    const message = response.message();
    message.body('Hello World!');
    res.redirect('/');
    // client.messages
    //       .create({
    //          body: req.body.message,
    //          from: 'whatsapp:+14155238886',
    //          to: 'whatsapp:+254768879348'
    //        })
    //       .then(message => console.log(message.sid))
    //       .done();
          // res.render('index')
  }
}
