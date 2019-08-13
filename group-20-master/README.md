# COM S 319 Deal Finder

A deal finder. Made with React and Express.

## Usage
### Local Development
Use ``` $ npm install ``` to install all required dependencies. (To be safe, run 'npm install' in both 'client' and 'server' directories, as well as the root)
### Tests
Use ``` $ npm test ``` to run the unit tests.
#### Start Server
- Navigate to 'server' folder in terminal/git bash. 
- Use ``` $ node server.js ``` to run server. You should see "Listening on Port 5000".
#### Run Client
- Open new terminal window and navigate to 'client' folder.
- Use ``` $ npm start ``` to run client. localhost:3000 will open in browser tab.

Thats it, client and server are now connected.

## Config
### Database
The current database at use is specified inside server/config/database.js. 
### Passport.js
The Passport.js module is configured inside the server/config/passport folder. 
#### strategies.js
Within strategies.js, each strategy to be used by passport is configured. A strategy is just a method of authenticating a request. <br />
For example, in this project, to authenticate a 'login' request, we ensure that the given username and password match a row in the database, and return the matching row.
To authenticate a 'token' request, we extract the token from the http request header, decode it, and return the user with the matching token. <br /> 
#### passport.js
Within passport.js, the strategies to made inside strategies.js are bound to passport so that they can be used when routing.