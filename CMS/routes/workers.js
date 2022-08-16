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
          // photo_url,
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

workers.post("/update", async (req, res) => {
  let id = req.body.user.id;
  let username = req.body.user.username;
  let profession = req.body.user.profession;
  let description = JSON.stringify(req.body.user.description);
  let links = JSON.stringify(req.body.user.links);
  // let therapies

  try {
    let query_results = await DB.update_worker(
      id,
      username,
      profession,
      description,
      links
    );
    console.log(query_results);
    res.send(query_results);
    // res.sendStatus(200);
  } catch (error) {
    // res.sendStatus(500);
    res.send(error);
    // console.log(error);
  }
  res.end();
});
workers.post("/get_search", async (req, res) => {
  let username = req.body.username;
  // console.log("username: ", username);
  try {
    let query_results = await DB.AuthWorker(username);
    res.send(query_results);
    // console.log("worker search: ", query_results);
  } catch (error) {
    console.log(error);
  }
  res.end();
});

workers.post("/get_acc_data", async (req, res) => {
  let username = req.body.username;
  console.log("username: ", username);
  try {
    let queryUser = await DB.AuthWorker(username);

    console.log("qUser: ", queryUser[0].therapies);
    let arr = JSON.parse(queryUser[0].therapies);
    let therapies = await Promise.all(
      arr.map(async (i) => {
        let therapy = await DB.getTherapyById(i);
        return therapy[0];
      })
    );

    queryUser[0].type = "worker";
    queryUser[0].therapies = therapies;
    res.send(queryUser[0]);
  } catch (error) {
    res.sendStatus(200);
  }
  res.end();
});
workers.post("/get_acc_data_by_id", async (req, res) => {
  let id = req.body.id;
  // console.log("username: ", username);
  try {
    let queryUser = await DB.getByID(id);
    console.log("qUser: ", queryUser);
    let arr = JSON.parse(queryUser[0].therapies);

    let therapies = await Promise.all(
      arr.map(async (i) => {
        let therapy = await DB.getTherapyById(i);
        return therapy[0];
      })
    );

    // queryUser[0].type = "worker";
    queryUser[0].therapies = therapies;
    // queryUser[0].type = "user";
    res.send(queryUser[0]);
  } catch (error) {
    res.sendStatus(200);
  }
  res.end();
});

module.exports = workers;
