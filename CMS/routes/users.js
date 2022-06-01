const express = require("express");
const users = express.Router();
const DB = require("../DB/dbConnection.js");
// const session = require("express-session");

// users.use(
//   session({
//     secret: "somesecret",
//     resave: false,
//     saveUninitialized: false,
//     cookies: {
//       expires: 60 * 2,
//     },
//   })
// );

//Checks if user submited both fields, if user exist and if the combiation of user and password matches

//Inserts a new user in our database id field are complete
users.post("/register", async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;

  if (username && password && email) {
    try {
      let queryResult = await DB.AuthUser(username);
      if (queryResult.length != 0) {
        res.send("Username already exists!");
      } else {
        let queryResult = await DB.AddUser(username, email, password);
        if (queryResult.affectedRows) {
          console.log("New user added!!");
          let authUser = await DB.AuthUser(username);
          req.session.user = authUser[0];
          req.session.user.type = "user";
          req.session.save(() => {
            console.log("saving session ", req.session);
          });
          res.send(req.session.user);
          res.send(authUser);
        }
      }
    } catch (err) {
      console.log(err);
      console.log(req.body);
      res.sendStatus(500);
    }
  } else {
    res.send("A field is missing!");
  }

  res.end();
});

module.exports = users;
