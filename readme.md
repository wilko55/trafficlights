# Traffic light status checker

## Set up
- Clone the repo and run `npm install`
- Set up an sql database using the schema.sql file
- Run the app with your own environment variables: `USER="admin" PASSWORD="password" DB="statuschecker" DBPORT="3307" npm start`
- The app defaults to run on port 7000

## About
There are two endpoints, `/status` and `/traffic`
- *status* has a code parameter for testing: `/status?code=200`
- *traffic* has a config parameter for pulling a list of urls from the database: `/traffic?config=allServices`

## Adding configurations
Consists of two parts:
1. Adding an extra config category in the database and assigning services to that category
2. Adding that config name to the approved validConfigurations array in /lib/validation.js

## Testing
For client side, go to `/test/testRunner.html`.
For server side, run `npm run test` on the command line.
