const MessagingResponse = require("twilio").twiml.MessagingResponse
const response = new MessagingResponse()

module.exports = {
  getUserRequest: (req, res) => {
    response.message("Hello There")
  }
}
