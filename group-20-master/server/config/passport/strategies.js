const LocalStrategy = require("passport-local").Strategy;
//Password Encryption
const bcrypt = require("bcrypt");
//Json Web Token
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
//DB
const mysql = require("mysql");
const dbconfig = require("../database");
const connection = mysql.createConnection(dbconfig.connection);
connection.query("USE " + dbconfig.database);

//Sign up -> insert new user into db
const signUpStrategy = new LocalStrategy(
  {
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
  },
  (req, username, password, done) => {
    connection.query(
      "SELECT * FROM users WHERE username = ?",
      [username],
      (err, rows) => {
        if (err) return done(err);
        if (rows.length) {
          return done(null, false, { message: "This email is already in use" });
        } else {
          const newUser = {
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            username: username,
            email: req.body.email,
            password: password,
            created: new Date()
          };
          //Hash password and insert to db
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              newUser.password = hash;
              connection.query(
                "INSERT INTO users (first_name, last_name, username, email, password, created) values (?, ?, ?, ?, ?, ?) ",
                [
                  newUser.first_name,
                  newUser.last_name,
                  newUser.username,
                  newUser.email,
                  newUser.password,
                  newUser.created
                ],
                (err, rows) => {
                  //Create new id for user by incrementing each time a user is created
                  newUser.id = rows.insertId;
                  return done(null, newUser, { message: "Sign up successful" });
                }
              );
            });
          });
        }
      }
    );
  }
);

//Log in -> find user in db
const loginStrategy = new LocalStrategy(
  {
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
  },
  (req, username, password, done) => {
    console.log("Selecting from db: " + username);
    connection.query(
      "SELECT * FROM users WHERE username = ? ",
      [username],
      (err, rows) => {
        if (err) return done(err, false, { message: "Network Error" });
        if (!rows.length)
          return done(null, false, {
            message: "This username is not registered"
          });
        if (!bcrypt.compareSync(password, rows[0].password))
          return done(null, false, { message: "Wrong Password!" });

        return done(null, rows[0], { message: "Successful Login" });
      }
    );
  }
);

//https://medium.com/front-end-weekly/learn-using-jwt-with-passport-authentication-9761539c4314
//Authenticate request with json web token
const jwtStrategy = new JWTStrategy(
  {
    //get token from header -> look at 'authFunctions.js'
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: "ligma" //lol
  },
  (jwtPayload, done) => {
    //Tutorial annotation:
    //"find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload."
    connection.query(
      "SELECT * FROM users WHERE username = ? ",
      [jwtPayload.username],
      (err, rows) => {
        if (err) return done(err);

        return done(null, rows[0], { message: "Successful Request" });
      }
    );
  }
);

module.exports.signUpStrategy = signUpStrategy;
module.exports.loginStrategy = loginStrategy;
module.exports.jwtStrategy = jwtStrategy;
