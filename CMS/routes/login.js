const express = require("express");
const login = express.Router();
const DB = require("../DB/dbConnection.js");
// const session = require("express-session");

// login.use(
//   session({
//     key: "user",
//     secret: "some secret",
//     saveUninitialized: true,
//     name: "User session",
//     resave: false,
//     cookie: {
//       secure: true,
//       expires: 1000 * 60 * 60 * 24,
//       sameSite: false,
//     },
//   })
// );
var session;

login.post("/", async (req, res) => {
  var username = req.body.username;
  var password = req.body.password;

  if (username && password) {
    try {
      let queryUser = await DB.AuthUser(username);
      let queryWorker = await DB.AuthWorker(username);

      if (queryUser.length > 0) {
        if (password === queryUser[0].password) {
          req.session.user = queryUser[0];
          req.session.user.type = "user";
          // delete req.session.user.password;
          req.session.save((err) => {
            console.log(err);
          });
          res.send(req.session.user);
          session = req.session;
          console.log("user", req.session);
        } else {
          res.send("Incorrect password!");
        }
      } else if (queryWorker.length > 0) {
        if (password === queryWorker[0].password) {
          req.session.user = queryWorker[0];
          req.session.user.type = "worker";
          // delete req.session.user.password;
          req.session.save((err) => {
            console.log(err);
          });
          session = req.session;
          res.send(req.session.user);
          console.log(req.session);
        } else {
          res.send("Incorrect password!");
        }
      } else {
        res.send("Username not found!");
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log("Please enter Username and Password!");
  }
});

login.get("/get_session", (req, res) => {
  console.log("get: ", session);
  if (req.session.user) {
    res.send({
      logged: true,
      user: req.session.user,
    });
  } else if (session) {
    res.send({
      logged: true,
      user: session,
    });
  }
  // else if (session) {
  //   req.session = session;
  //   res.send({
  //     logged: true,
  //     user: req.session.user,
  //   });
  // }
  else {
    res.send({ logged: false });
  }
});

login.get("/logout", (req, res) => {
  console.log("before: ", req.session);
  req.session = null;
  session = null;
  console.log("after: ", req.session);
  res.send("loged out");
});

module.exports = login;
