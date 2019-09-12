require("dotenv").config();
const keys = require("./keys.js");
const Spotify = require('node-spotify-api');

 
let spotify = new Spotify(keys.spotify);
 


function startLiri(){

    spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log(data); 
      });

      

}

startLiri();

