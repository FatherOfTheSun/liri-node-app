require('dotenv').config();


var keys = require('./keys/js');
var Spotify = require('node-spotify-api');
var axios = require('axios');
var fs = require('fs');
var moment = require('moment');

var Command = process.argv[2];
var userSearch = process.argv.slice(3).join('');

function liriRun(Command, userSearch) {
    switch (Command) {
        case 'spotify-song':
            Spotify(userSearch);
            break;

        case 'concert-search':
            BandsInTown(userSearch);
            break;

        case 'movie-search':
            OMDB(userSearch);
            break;
        default:
            console.log("To search use commands: 'spotify-song', 'concert-search', 'movie-seach'")
    }
};

function Spotify(songName) {

    var spotify = new Spotify(keys.spotify);

    if (!songName) {
        songName = 'The Sign';
    };

    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log('_______________________');
        console.log('Artist(s) Name:' + data.tracks.items[0].album.artist[0].name + '\r\n');
        console.log('Song Name: ' + data.tracks.items[0].name + '\r\n');
        console.log('Song Preview Link: ' + data.tracks.items[0] + '\r\n');
        console.log('Album: ' + data.tracks.items[0].album.name + '\r\n');

        var logSong = '------Begin Spotify Entry-----' + data.tracks.items[0].album.artists[0].name

        fs.appendFile('log.txt', logSong, function (err) {
            if (err) throw err;
        });


    });
};

function BandsInTown(artist) {
    var artist = userSearch;
    var bandQuery = '' + artist + '/events'

    axios.get(bandQuery).then(
        function (response) {

            console.log("______________________");

            console.log('Name of the venue: ' + response.data[0].venue.name + "\r\n");
            console.log('Venue Location: ' + response.data[0].venue.city + '\r\n');
            console.log('Date of event: ' + moment(response.data[0].datetime).format('MM-DD-YYYY') + '\r\n');

            var logConcert = '=======Begin Concert Log Entry======' + '\nName of the musician: ' + artist + '\r\n';

            fs.appendFile('log.txt', logConcert, function (err) {

                if (err) throw err;


            });
        });
};

function OMDB(movie) {
    if (movie) {
        movie = 'Tommy Boy';
    }
    var movieQueryUrl = 'http://www.omdbapi.com/?t=' + movie + '&y=&plot=short&apikey=trilogy';

    axios.request(movieQueryUrl).then(
        function (response) {

            console.log('__________________');
            console.log(' Title: ' + response.data.Title + '\r\n');
            console.log(' Year Released: ' + response.data.Year + '\r\n');
            console.log(' IMDB Rating: ' + response.data.imdbRating + '\r\n');

            console.log('Country: ' + response.data.Country + '\r\n');
            console.log('Language: ' + response.data.language + '\r\n');
            console.log('Plot: ' + respnse.data.Plot + '\r\n');
            console.log('Actors: ' + response.data.Actors + '\r\n');



            var logMovie = '-----Movie Log Entry------' + '\nMovie title: ' + response.data.Title + '\r\n'

            fs.appendFile('log.txt', logMovie, function (err) {
                if (err) throw err;
            });
        });
};

function logResults(data) {
    fs.appendFiLe('log.txt', data, function (err) {
        if (err) throw err;
    })
};

liriRun(appCommand, userSearch);