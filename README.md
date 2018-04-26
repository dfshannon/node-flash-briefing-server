# Node Flash Briefing Server 
## Overview
This is a node server example for serving up Alexa flash briefing content.
This project uses a MySql database for storing flash-briefing events and exposes a
restful API for CRUD operations.  API endpoints for update operations are protected using
basic-authentication.

This server supports the following:

- Node/Express rest api
- MySql database for event storage
- Basic authentication
- ES6 with babel for transpiling code.
- Webpack 4
- Hot module reloading for development
- Unit and integration tests using mocha
- Buyan logging
- eslint script

## Prerequisites
 - Download and install git from here: https://git-scm.com/download/
 - Install Node.js version 8.9 or greater from: https://nodejs.org/en/
 - Clone the repository from: https://github.com/dfshannon/node-flash-briefing-server.git
 - Run the following to install packages:
     ```
     npm install
     ```
  - Create a .env file in the project root populated with the following environment variables
   (change to your environment):
    - DB_HOST=localhost
    - DB_USER=root
    - DB_PASSWORD=xxxxx
    - DB_DATABASE=flash_briefing
    - AUTH_USER=admin
    - AUTH_PASSWORD=password
  
## Database
 - You will need access to a local or remote MySql database
 - Create a database in MySql to store the event table.  You can use the MySql commandline or
 a DB program like phpMyAdmin.
 - Create the event table in the database.  You can use the db_schema.sql file in the config directory.
 ```
mysql -uroot -p flash_briefing < db_schema.sql 

```
   
### Development deploy
  - Run the following command for the a development deploy on port 8080
  
    ```
    npm run startServer
    ```
### Testing output
After the server is running you can view the service response at: http://localhost:8080/flashbriefing.
You can view the health check response at: http://localhost:8080/health.  The full api includes:
 - GET  http://localhost:8080/flashbriefing (returns all events for today)
 - GET  http://localhost:8080/event (returns all events)
 - GET  http://localhost:8080/event?date=yyyy-mm-dd (returns all events for the specified date)
 - GET  http://localhost:8080/event/{id} (returns the event matching row id)
 - POST http://localhost:8080/event (creates a new event - body data defined below)
 - PUT  http://localhost:8080/event/{id} (updates the specified event - body data defined below)
 - DELETE http://localhost:8080/event/{id} (deletes the specified event)

POST Curl
```
curl -d '{"updateDate":"2018-03-27", "titleText":"Around town", "mainText":"The Time is playing at the inn tonight at 5:00.","redirectionUrl":"http://www.amazon.com"}' -H "Content-Type: application/json" -X POST -u admin:password http://localhost:8080/event
```
PUT Curl
```
curl -d '{"updateDate":"2018-03-27", "titleText":"Around town", "mainText":"The Time is playing at the inn tonight at 6:30.","redirectionUrl":"http://www.amazon.com"}' -H "Content-Type: application/json" -X PUT -u admin:password http://localhost:8080/event
```


