require("dotenv").config()
const client = require('twilio')(process.env.accountSid, process.env.authToken);

module.exports = {
  getUserRequest: async (req, res) => {
    const userResponse = ['hi', 'hello', 'info']
    isUserResponse = userResponse.includes(req.body.Body.toLowerCase())
    if(isUserResponse) {
      try {
        await client.messages.create({
          body: `Hello there ${req.body.ProfileName}, am *BotMontana*.Your Favourite WhatsAppBot here to help you, be able search movies, get movie/series updates that are trending and so much more.\n
Type *trending* to get all trending movies/series.
Type *trending movies* to get all trending movies.
Type *trending series* to get all trending series.
Type *search movie_name* to get your movie search results.`,
          to: req.body.From,
          from: req.body.To
        }).done()
      }catch(err) {
        await client.messages.create({
          body: `Someting wrong has happen: " ${err.message}""`,
          to: req.body.From,
          from: req.body.To
        }).done()
      }
    }
  }
}
