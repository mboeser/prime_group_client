# BREAKTHROUGH DEV NOTES
Created by Heather Lutz, Dave Gamberg, Dane Smith, Mike Boesser

Hi! You might be reading this if you are helping Breakthrough Twin Cities update their application, fix bugs, or perhaps are a Prime Student yourself!

This application uses a very fast and brittle pg node package called pg-copy-streams. Be careful changing any upload. It took us 2 days. As of writing, postgres is 9.5 beta has an UPSERT function that may be able to simplfy the whole process.
Daniel Bernal was our contact for this project, and his @breakthrough email account has ownership of the Heroku host, Postgres Database, & Google APIs. 
Each clientside route has its own controller, for the vast majority. 
If you havent learned it already, make sure you ask about Envirionment Variables in your code editor so you don't have the API keys and other private constants accidentally added to GitHub. That might have happened.
