CREATE TABLE users (
 id int(11) NOT NULL AUTO_INCREMENT,
 first_name varchar(100) NOT NULL,
 last_name varchar(100)  NOT NULL,
 username varchar(100) NOT NULL,
 email varchar(100) NOT NULL,
 password varchar(255) NOT NULL,
 created datetime DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY (id));

 CREATE TABLE saved_searches(
 id int(11) NOT NULL AUTO_INCREMENT,
 itemname varchar(100) NOT NULL,
 link varchar(512) NOT NULL,
 imagelink varchar(512) NOT NULL,
 price varchar(100) NOT NULL,
 targetprice varchar(100) NOT NULL,
 username varchar(100) NOT NULL,
 created datetime DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY (id));

CREATE TABLE bought (
 id int(11) NOT NULL AUTO_INCREMENT,
 itemname varchar(100) NOT NULL,
 link varchar(512) NOT NULL,
 price varchar(100) NOT NULL,
 username varchar(100) NOT NULL,
 created datetime DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY (id));
 
 
 
/*INSERT INTO users (first_name, last_name, username, email, password) values ("test", "ing", "test-ing", "test@gmail.com", 123); 
*/

SELECT * FROM users ;

DELETE from users where username = "test-ing3";