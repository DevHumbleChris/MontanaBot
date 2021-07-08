require("dotenv").config()
const client = require('twilio')(process.env.accountSid, process.env.authToken);
const axios = require('axios')

module.exports = {
  getUserRequest: async (req, res) => {
    try {
      const userResponse = ['hi', 'hello', 'info']
      const userReply = req.body.Body.toLowerCase().split(' ')
      const userSearchRequest = userReply[0]
      const moviesTrendingReq = [userSearchRequest, userReply[1]].join(' ')
      const seriesTrendingReq = [userSearchRequest, userReply[1]].join(' ')
      const userMovieSearchReq = []
      for(let x = 1; x < userReply.length; x++) {
        userMovieSearchReq.push(userReply[x])
      }
      const search = [userReply[0], userMovieSearchReq.join(" ")].join(" ")
      isUserResponse = userResponse.includes(req.body.Body.toLowerCase())
      if(isUserResponse) {
        await client.messages.create({
          body: `Hello there ${req.body.ProfileName}, am *BotMontana*.Your Favourite WhatsAppBot here to help you, be able to search movies, get movie/series updates that are trending and so much more.\n
  Type *trending* to get all trending movies/series.
  Type *trending movies* to get all trending movies.
  Type *trending series* to get all trending series.
  Type *search movie_name* to get your movie search results.\nFor more info visit our website: https://montflix.herokuapp.com \n
  I was Developed By: Am.Chris_KE\nWhatsApp Me: https://wa.me/message/BSLLTZE6NKUIF1`,
          to: req.body.From,
          from: req.body.To
        }).done()
      }

      if(userSearchRequest === "trending" && userReply.length < 2) {
        const responseData = await axios.get(process.env.TRENDING)
        const trendindMovies = responseData.data

        for(let x = 0; x <= 5; x++) {
          const movieName = trendindMovies.results[x].title || trendindMovies.results[x].name
          const imagePath = trendindMovies.results[x].poster_path || trendindMovies.results[x].backdrop_path
          setTimeout(() => {
            client.messages.create({
              body: `*${movieName}*\n*Overview*: ${trendindMovies.results[x].overview}\n*Media Type*: ${trendindMovies.results[x].media_type}
              `,
              to: req.body.From,
              from: req.body.To,
              mediaUrl: `${process.env.IMAGE_URL}${imagePath}`
            }).done()
          }, 1500)
        }

        setTimeout(() => {
          client.messages.create({
            body: `We have reduced the search results to 5 due to WhatsApp Policy And Twilio API policy. Kindly support us so that we can pass the restrictions policy to unlimited results.\nWhatsApp Me: https://wa.me/message/BSLLTZE6NKUIF1
            `,
            to: req.body.From,
            from: req.body.To
          }).done()
        },8000)
      }

      if(moviesTrendingReq === "trending movies") {
        const responseData = await axios.get(process.env.MOVIES_TRENDING)
        const trendindMovies = responseData.data

        for(let x = 0; x <= 5; x++) {
          const movieName = trendindMovies.results[x].title || trendindMovies.results[x].name
          const imagePath = trendindMovies.results[x].poster_path || trendindMovies.results[x].backdrop_path
          setTimeout(() => {
            client.messages.create({
              body: `*${movieName}*\n*Overview*: ${trendindMovies.results[x].overview}
              `,
              to: req.body.From,
              from: req.body.To,
              mediaUrl: `${process.env.IMAGE_URL}${imagePath}`
            }).done()
          }, 1500)
        }

        setTimeout(() => {
          client.messages.create({
            body: `We have reduced the search results to 5 due to WhatsApp Policy And Twilio API policy. Kindly support us so that we can pass the restrictions policy to unlimited results.\nWhatsApp Me: https://wa.me/message/BSLLTZE6NKUIF1
            `,
            to: req.body.From,
            from: req.body.To
          }).done()
        },8000)
      }

      if(seriesTrendingReq === "trending series") {
        const responseData = await axios.get(process.env.TRENDING_SERIES)
        const trendindMovies = responseData.data

        for(let x = 0; x <= 5; x++) {
          const movieName = trendindMovies.results[x].title || trendindMovies.results[x].name
          const imagePath = trendindMovies.results[x].poster_path || trendindMovies.results[x].backdrop_path
          setTimeout(() => {
            client.messages.create({
              body: `*${movieName}*\n*Overview*: ${trendindMovies.results[x].overview}
              `,
              to: req.body.From,
              from: req.body.To,
              mediaUrl: `${process.env.IMAGE_URL}${imagePath}`
            }).done()
          }, 1500)
        }

        setTimeout(() => {
          client.messages.create({
            body: `We have reduced the search results to 5 due to WhatsApp Policy And Twilio API policy. Kindly support us so that we can pass the restrictions policy to unlimited results.\nWhatsApp Me: https://wa.me/message/BSLLTZE6NKUIF1
            `,
            to: req.body.From,
            from: req.body.To
          }).done()
        },8000)
      }

      if(search === `${search}`) {
        const responseData = await axios.get(`${process.env.SEARCH_URL}${userMovieSearchReq.join(" ")}`)
        const trendindMovies = responseData.data

        for(let x = 0; x <= (responseData.data.length <= 5 ? responseData.data.length : 5); x++) {
          const movieName = trendindMovies.results[x].title || trendindMovies.results[x].name || trendindMovies.results[x].original_name || trendindMovies.results[x].original_title
          const imagePath = trendindMovies.results[x].poster_path || trendindMovies.results[x].backdrop_path
          setTimeout(() => {
            client.messages.create({
              body: `${movieName}\n*Overview*: ${trendindMovies.results[x].overview}\n*MediaType:*${trendindMovies.results[x].media_type}
              `,
              to: req.body.From,
              from: req.body.To,
              mediaUrl: `${process.env.IMAGE_URL}${imagePath}`
            }).done()
          }, 1500)
        }

        setTimeout(() => {
          client.messages.create({
            body: `We have reduced the search results to 5 due to WhatsApp Policy And Twilio API policy. Kindly support us so that we can pass the restrictions policy to unlimited results.\nWhatsApp Me: https://wa.me/message/BSLLTZE6NKUIF1
            `,
            to: req.body.From,
            from: req.body.To
          }).done()
        },8000)
      }
      console.log(userMovieSearchReq, search)
    }catch(err) {
      await client.messages.create({
        body: `Someting wrong has happen: " ${err.message}""`,
        to: req.body.From,
        from: req.body.To
      }).done()
    }
  }
}
