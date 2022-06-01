const express = require("express");
const workers = express.Router();
const DB = require("../DB/dbConnection.js");
// const session = require("express-session");

// workers.use(
//   session({
//     secret: "somesecret",
//     resave: false,
//     saveUninitialized: false,
//     cookies: {
//       expires: 60 * 2,
//     },
//   })
// );

// workers.get("/login", (req, res) => {
//   if (req.session.worker) {
//     res.send({
//       logged: true,
//       worker: req.session.worker,
//     });
//   } else {
//     res.send({ logged: false });
//   }
// });

workers.post("/register", async (req, res) => {
  console.log(req.body);
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;
  let photo_url = "";
  let profession = req.body.profession;
  if (username && password && email) {
    let queryResult = await DB.AuthWorker(username);
    if (queryResult.length != 0) {
      res.send("Username already exists!");
    } else {
      try {
        queryResult = await DB.AddWorker(
          username,
          email,
          password,
          photo_url,
          profession
        );
        if (queryResult.affectedRows) {
          console.log("New worker added!!");
          let authWorkerArr = await DB.AuthWorker(username);
          let authWorker = authWorkerArr[0];
          authWorker.type = "worker";
          req.session.user = authWorker;
          console.log(req.session.user);
          res.send(req.session.user);
        }
      } catch (err) {
        console.log(err);
        res.sendStatus(500);
      }
    }
  } else {
    //console.log(req.body.email);
    console.log("A field is missing!");
  }

  res.end();
});

module.exports = workers;
