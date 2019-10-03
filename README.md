# LIRI Bot
 LIRI is a *Language Interpretation* and *Recognition* Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

![Bot Image](./images/bot.PNG)

 ## NPM Dependencies
 * Axios
 * DotEnv
 * FS
 * Moment
 * Node-Spotify-API
 * Request

 ## API Integrations
 * Bands in Town Artist Events API
 * OMDB API
 * Spotify API

 ## How to use LIRI

 ### LIRI will take in the following commands

 **$ node liri.js concert-this *"artist/band name here"***
 * This will search the Bands in Town Artist Events API for an artist/band you specify and render the following information about each event to the terminal:
   * Name of the venue
   * Venue location
   * Date of the Event (use moment to format this as "MM/DD/YYYY")

 **$ node liri.js movie-this "movie name here"**
 * This will search the OMDB API for a movie you specify and render the following information about the movie:
   * Title of the movie
   * Year the movie came out
   * IMDB Rating
   * Rotten Tomatoes Rating
   * Country where the movie was produced
   * Language of the movie
   * Plot of the movie
   * Actors in the movie

 Note: If no movie is specified in the command the results return the movie "Mr. Nobody".

 **$ node liri.js spotify-this-song *"song name here"***
 * This will search the Spotify API for a song you specify and render the following information about the artist:
   * Artist(s)
   * The song's name
   * A preview link of the song from Spotify
   * The album that the song is from

Note: If no song is specified in the command the results return the wildcard song "The Sign" by "Ace of Base".

 **$ node liri.js do-what-it-says**
 * This will look in the random.txt file for the song there and then use the Spotify API to return the same information as the spotify-this-song command.

 

 

 