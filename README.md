# liri-node-app

<h1>LIRI</h1>
<h2>...better than SIRI?</h2>

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.


The app takes up to two arguments. example: node liri.js argument1 "argument2".

Once the two arguments are recieved, it will then call its respective API to get the info that the user is requestiong.

Acceptable commands for argument1:

* `concert-this`

* `spotify-this-song`

* `movie-this`

* `do-what-it-says`

Please note that any multiword arguments passed through **must be in "quotes"**.

Example: node liri.js movie-this "The Matrix"

You can see a youTube video of my liri-bot in action here: https://youtu.be/TLFj4mrePFQ

This was an app developed soley by SpeedHunterSam for the purpose of demonstraing Axiox, Moment, DotENV, and multiple APIs in JSON with keys and with tokens.  APIs used... BandsInTown, Spotify & OMDb.

