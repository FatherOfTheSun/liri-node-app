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
            getSpotify(userSearch);
            break;

        case 'concert-this':
            getBandsInTown(userSearch);
            break;

        case 'movie-this':
            getOMDB(userSearch);
            break;

    }


}




