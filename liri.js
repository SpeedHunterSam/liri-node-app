require("dotenv").config(); //using dotenv to hide private spotify key
const keys = require("./keys.js");
const Spotify = require('node-spotify-api');
const axios = require("axios");
const moment = require("moment");
const fs = require('fs'); //do not npm install...native to javaScript


 let spotify = new Spotify(keys.spotify); //importing private spotify API keys

 const input1 = process.argv[2]; //user input argument one
 const input2 = process.argv[3]; //user input argument two


function startLiri(argument, userQuery){

    console.log("OK...Let's " + argument);
    console.log(" for " + userQuery);

    switch(argument){
        case "concert-this":
            findBandsInTown(userQuery);
            break;
        case "spotify-this-song":
            spotifySong(userQuery);
            break;
        case "movie-this":
            getMovieInfo(userQuery);
            break;
        case "do-what-it-says":
            pleaseReadLocalFile();
            break;
        default:
            console.log("Invalid Arguments..try again");
            
    }
}

function findBandsInTown(bandName){

    //this function calls the bandsintown.com API


    axios.get("https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp").then(
        function (response) {


            console.log("############################################");
            console.log("\nArtist: " + bandName);  //Display name of band that user input
            console.log("\nLocation: " + response.data[0].venue.name); // Name of Venue
            console.log("\nCity: " + response.data[0].venue.city); // Location of Venue
            console.log("\nDate & Time: " + response.data[0].datetime); //concert date
            console.log("\n############################################");
            
        }
);



}

function spotifySong(songName)
{

    //spotify JSON for getting top search result for track search from spotify.

    if (songName === ""){
        //if no song name is provided the set song name to The Sign
        songName = "The Sign"
    }



    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }

        const fromSpotify = data.tracks.items[0]; //shorthand the JSON inquiry

        console.log("############################################");
        console.log("\nArtist: " + fromSpotify.artists[0].name); //*shows artist
        console.log("\nAlbum: " + fromSpotify.album.name); //name of the album
        console.log("\nTrack: " + fromSpotify.name); //*name of track found in spotify
        console.log("\nPreview URL: " + fromSpotify.preview_url); //*gives the link to the url
        console.log("\n############################################");

      });


}



function getMovieInfo(movieName)
{
    //this function calls the OMDb movie API

    

// We then run the request with axios module on a URL with a JSON
axios.get("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy").then(
  function(response) {

    const fromOMDb = response.data; //shorthand the JSON inquiry

    console.log("############################################");
    console.log("\nMovie Title: " + fromOMDb.Title); 
    console.log("\nRelease Date: " + fromOMDb.Year);   
    console.log("\nThe movie's rating is: " + fromOMDb.imdbRating); 
    console.log("\nRotten Tomatoes Rating: " + fromOMDb.Ratings[1].Value);
    console.log("\nCountry of Origin: " + fromOMDb.Country);
    console.log("\nLanguage(s): " + fromOMDb.Language);
    console.log("\nActors: " + fromOMDb.Actors);
    console.log("\nPlot Summary: " + fromOMDb.Plot);
    console.log("\n############################################");


  }
);

}

function pleaseReadLocalFile(){

    //this function uses fs node package to read local file

    fs.readFile("random.txt", "utf8", function(error, data){

        if(error){
            return console.log(error);
        }

        //test to see if data is being read
        console.log(data);

        const inFromFile = data.split(",");

        startLiri(inFromFile[0], inFromFile[1]);


    })


}

//lets start the app with this function
startLiri(input1, input2);

