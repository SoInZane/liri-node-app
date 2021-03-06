// Info for Spotify
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

// Info for Request
var request = require("request");

// Info for Moment to format the date
var moment = require("moment");

// Info for fs
var fs = require("fs");

var command = process.argv[2];

// If you want to know about a specific concert
if (command === "concert-this") {

    var artist = process.argv[3];

    request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function (error, response, body) {

        if (!error && response.statusCode === 200) {
            console.log("-------------------------------------");
            console.log("Venue: " + JSON.parse(body)[0].venue.name);
            console.log("Location: " + JSON.parse(body)[0].venue.city + " " + JSON.parse(body)[0].venue.region);
            console.log("Date: " + moment(JSON.parse(body)[0].datetime).format("MM/DD/YYYY"));
            console.log("-------------------------------------");

            var artistInfo = "\n-------------------------------------" + "\nArtist/Band: " + process.argv[3] + "\nVenue: " + JSON.parse(body)[0].venue.name + "\nLocation: " + JSON.parse(body)[0].venue.city + " " + JSON.parse(body)[0].venue.region + "\nDate: " + moment(JSON.parse(body)[0].datetime).format("MM/DD/YYYY") + "\n-------------------------------------";
            fs.appendFile("log.txt", artistInfo, function (error) {
                if (error) throw error;
            });
        }
    });

    // If you want to know about a specific song
} else if (command === "spotify-this-song") {
    var song = process.argv[3];

    if (song === undefined) {
        song = "ace of base the sign";
    }

    spotify.search({
        type: "track",
        query: song
    }, function (err, data) {
        if (err) {
            return console.log("Error occured: " + err);
        }
        // first console log that is commented out is to retrieve the object info
        // console.log(data.tracks.items[0]);
        console.log("-------------------------------------");
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Song Name: " + data.tracks.items[0].name);
        console.log("Preview Link: " + data.tracks.items[0].preview_url);
        console.log("Album: " + data.tracks.items[0].album.name);
        console.log("-------------------------------------");

        var songInfo = "\n------------------------------------- " + "\nArtist: " + data.tracks.items[0].artists[0].name + "\nSong Name: " + data.tracks.items[0].name + "\nPreview Link: " + data.tracks.items[0].preview_url + "\nAlbum: " + data.tracks.items[0].album.name + "\n-------------------------------------";
        fs.appendFile("log.txt", songInfo, function (err) {
            if (err) throw err;
        });
    });


    // If you want to know about a specific movie
} else if (command === "movie-this") {

    var movie = process.argv[3];

    if (movie === undefined) {
        movie = "Mr. Nobody";
    }

    request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

        if (!error && response.statusCode === 200) {

            // Information about Movie
            console.log("-------------------------------------");
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year Released: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[0].Value);
            console.log("Country Produced: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("-------------------------------------");

            var movieInfo = "\n-------------------------------------" + "\nTitle: " + JSON.parse(body).Title + "\nYear Released: " + JSON.parse(body).Year + "\nIMDB Rating: " + JSON.parse(body).imdbRating + "Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[0].Value + "\nCountry Produced: " + JSON.parse(body).Country + "Language: " + JSON.parse(body).Language + "Plot: " + JSON.parse(body).Plot + "Actors: " + JSON.parse(body).Actors + "\n-------------------------------------";
            fs.appendFile("log.txt", movieInfo, function(error){
                if (error) throw error;
            });
        }
    });

    // If you want to return the song from the random.txt file
} else if (command === "do-what-it-says") {

    fs.readFile("random.txt", "utf8", function (error, data) {

        if (error) {
            return console.log(error);
        }

        // console.log(data);
        var dataArr = data.split(",");
        // console.log(dataArr);

        command = dataArr[0];
        whatToCommand = dataArr[1];

        // If you want to know about a song from the wildcard
        if (command === "spotify-this-song") {
            var song = whatToCommand;

            if (song === undefined) {
                song = "The Sign";
            }

            spotify.search({
                type: "track",
                query: song
            }, function (err, data) {
                if (err) {
                    return console.log("Error occured: " + err);
                }
                console.log(data.tracks.items[0].album[0]);
                console.log("-------------------------------------");
                console.log("Command: ", command, ", Song Name: ", song);
                console.log("Artist: " + data.tracks.items[0].artists[0].name);
                console.log("Song Name: " + data.tracks.items[0].name);
                console.log("Preview Link: " + data.tracks.items[0].preview_url);
                console.log("Album: " + data.tracks.items[0].album.name);
                console.log("-------------------------------------");

                var songInfo = "\n------------------------------------- " + "\nArtist: " + data.tracks.items[0].artists[0].name + "\nSong Name: " + data.tracks.items[0].name + "\nPreview Link: " + data.tracks.items[0].preview_url + "\nAlbum: " + data.tracks.items[0].album.name + "\n-------------------------------------";
                fs.appendFile("log.txt", songInfo, function (err) {
                    if (err) throw err;
                });
            });

            // If the Command is not entered or is incorrectly entered do the following:
        } else {
            console.log("Command Error");
        }

        console.log("-------------------------------------");
        console.log("Command: ", command);
        console.log("-------------------------------------");
    });

    // If the Command is not entered or is incorrectly entered do the following:
} else {
    console.log("Command Error");
}