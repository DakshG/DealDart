const passport = require('passport');
const strategy = require('./strategies');
//DB
const mysql = require('mysql');
const dbconfig = require('../database');
const connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);

//For sessions - Not using because we use tokens instead
/*
passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((id, done) => {
    connection.query("SELECT * FROM users WHERE id = ? ", [id],
    function(err, rows) {
        done(err, rows[0]);
    });
});
*/

//Use Strategies 
passport.use('local-signup', strategy.signUpStrategy);
passport.use('local-login', strategy.loginStrategy);
//Json Web Token Strategy
passport.use('local-jwt', strategy.jwtStrategy);

module.exports = passport;

