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

            //console.log(response);
        
            console.log("Artist: " + bandName);
            console.log("\nLocation: " + response.data[0].venue.name);
            console.log("\nCity: " + response.data[0].venue.city);
            console.log("\Date & Time: " + response.data[0].datetime);
            
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
       
      //console.log(data.tracks.items[0].artists[0].name);
     


      //console.log(data.tracks.items);
      
       // console.log(data.tracks.items[1]); //*show list of albums
        console.log(data.tracks.items[0].artists[0].name); //*shows artist
        console.log(data.tracks.items[0].name); //*name of track found in spotify
        console.log(data.tracks.items[0].preview_url); //*gives the link to the url
        console.log(data.tracks.items[0].album.name); //name of the album



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

