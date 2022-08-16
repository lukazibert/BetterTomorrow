const express = require("express");
const users = express.Router();
const DB = require("../DB/dbConnection.js");
// const session = require("express-session");

// users.use(
//   session({
//     key: "user",
//     secret: "some secret",
//     saveUninitialized: true,
//     name: "User session",
//     resave: false,
//     cookie: {
//       secure: false,
//       expires: 1000 * 60 * 60 * 24,
//       sameSite: false,
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
          // res.send(authUser);
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

users.post("/update", async (req, res) => {
  let id = req.body.id;
  let username = req.body.username;
  let gender = req.body.gender;
  let age = req.body.age;
  let height = req.body.height;
  let weight = req.body.weight;
  let pain_levels = req.body.pain_levels;
  console.log("pain", pain_levels);

  try {
    let query_results = await DB.update_user(
      id,
      username,
      gender,
      age,
      height,
      weight,
      pain_levels
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

users.post("/get_acc_data", async (req, res) => {
  let username = req.body.username;
  console.log("username: ", username);
  try {
    let queryUser = await DB.AuthUser(username);
    console.log("qUser: ", queryUser);

    queryUser[0].type = "user";
    res.send(queryUser[0]);
  } catch (error) {
    res.sendStatus(200);
  }
  res.end();
});

users.post("/get_acc_data_by_id", async (req, res) => {
  let id = req.body.id;
  // console.log("username: ", username);
  try {
    let queryUser = await DB.getUserByID(id);
    console.log("qUser: ", queryUser);

    // queryUser[0].type = "user";
    res.send(queryUser[0]);
  } catch (error) {
    res.sendStatus(200);
  }
  res.end();
});

users.post("/update_therapy_list", async (req, res) => {
  let user_id = req.body.id;
  let therapy_id = req.body.therapy_id;

  try {
    let user_therapy_list = await DB.getUserByID(user_id);
    let list = JSON.parse(user_therapy_list[0].therapies);
    list.push(therapy_id);
    console.log(list);
    list = JSON.stringify(list);
    let query = await DB.updateUserTherapyList(list, user_id);
    console.log("result: ", query);
    res.send(query);
  } catch (error) {
    console.log(error);
  }
});

module.exports = users;
