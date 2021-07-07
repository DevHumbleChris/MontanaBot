require("dotenv").config()
const client = require('twilio')(process.env.accountSid, process.env.authToken);
const axios = require('axios')

module.exports = {
  getUserRequest: async (req, res) => {
    try {
      const userResponse = ['hi', 'hello', 'info']
      isUserResponse = userResponse.includes(req.body.Body.toLowerCase())
      if(isUserResponse) {
        await client.messages.create({
          body: `Hello there ${req.body.ProfileName}, am *BotMontana*.Your Favourite WhatsAppBot here to help you, be able search movies, get movie/series updates that are trending and so much more.\n
  Type *trending* to get all trending movies/series.
  Type *trending movies* to get all trending movies.
  Type *trending series* to get all trending series.
  Type *search movie_name* to get your movie search results.`,
          to: req.body.From,
          from: req.body.To
        }).done()
      }

      if(req.body.Body.toLowerCase() === "trending") {
        const responseData = await axios.get(process.env.TRENDING)
        const trendindMovies = responseData.data

        for(let x = 0; x <= trendindMovies.results.length; x++) {
          await client.messages.create({
            body: `*${trendindMovies.results[x].title || trendindMovies.results[x].name}*\n
            *Overview*: ${trendindMovies.results[x].overview}\n
            *Media Type*: ${trendindMovies.results[x].media_type || trendindMovies.results[x].backdrop_path}
            `,
            to: req.body.From,
            from: req.body.To,
            mediaUrl: `${process.env.IMAGE_URL}${trendindMovies.results[x].poster_path || trendindMovies.results[x].backdrop_path}`
          }).done()
        }
      }
    }catch(err) {
      await client.messages.create({
        body: `Someting wrong has happen: " ${err.message}""`,
        to: req.body.From,
        from: req.body.To
      }).done()
    }
  }
}
