require("dotenv").config();
const keys = require("./keys.js");
const Spotify = require('node-spotify-api');
const axios = require("axios");

 
let spotify = new Spotify(keys.spotify);
 


function startLiri(){

    //start function that accepts arguments from console
    let userQuery = "";

    const argument = process.argv[2];
    userQuery = process.argv[3];

    console.log(argument);
    console.log(userQuery);

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

            console.log(response);
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
       
      console.log(data.tracks.items[0].artists[0]); 
      
      });


}



function getMovieInfo(movieName)
{
    //this function calls the OMDb movie API

    

// We then run the request with axios module on a URL with a JSON
axios.get("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy").then(
  function(response) {
    // Then we print out the imdbRating
    console.log("The movie's rating is: " + response.data.imdbRating);
  }
);

}

function pleaseReadLocalFile(){

    //this function uses fs node package to read local file
}


startLiri();

