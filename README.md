# Node Flash Briefing Server 
## Overview
This is a simple node server example for serving up Alexa flash briefing content.
This project just supports a single REST API endpoint and server up static JSON.  Future 
versions will make use of a database to store the flash briefing content and the api
will be expanded to support CRUD functions for maintaining the data.

This server supports the following:
- Webpack 4
- Uses babel to transpile code.
- Hot module reloading for development
- eslint script

## Prerequisites
 - Download and install git from here: https://git-scm.com/download/
 - Install Node.js version 8.9 or greater from: https://nodejs.org/en/
 - Clone the repository from: https://github.com/dfshannon/node-flash-briefing-server.git
 - Run the following to install packages:
     ```
     npm install
     ```
### Development deploy
  - Run the following command for the a development deploy on port 8080
  
    ```
    npm run startServer
    ```
### Testing output
After the server is running you can view the service response at: http://localhost:8080/flashbriefing.
You can view the health check response at: http://localhost:8080/health



