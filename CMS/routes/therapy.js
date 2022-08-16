const { constants } = require("buffer");
const express = require("express");
const therapy = express.Router();
const DB = require("../DB/dbConnection.js");

//get therpies by users id
therapy.get("/user/:id", async (req, res) => {
  // console.log(req.params);
  let id = req.params.id;
  // console.log(therapies_arr);
  // let user_id = req.params.id;
  try {
    let user_therapy_list = await DB.getUserByID(id);
    let list = JSON.parse(user_therapy_list[0].therapies);
    let queryResult = await Promise.all(
      list.map(async (i) => {
        let therapy1 = await DB.getTherapyById(i);
        let queryUser = await DB.getByID(therapy1[0].worker_id);
        therapy1[0].username = queryUser[0].username;
        console.log(therapy1);
        return therapy1[0];
      })
    );
    console.log(queryResult);
    res.send(queryResult);
  } catch (error) {
    console.log(error);
  }
});

therapy.get("/worker/:id", async (req, res) => {
  let worker_id = req.params.id;
  try {
    var queryResult = await DB.GetWorkerTherapies(worker_id);
    res.json(queryResult);
  } catch (error) {
    console.log(error);
  }
});

therapy.post("/post", async (req, res) => {
  let worker_id = req.body.worker_id;
  let title = req.body.therapy.title;
  let description = req.body.therapy.description;
  let photo_url = req.body.therapy.photo_url;
  let link1 = req.body.therapy.link1 || "";
  let link2 = req.body.therapy.link2 || "";
  let link3 = req.body.therapy.link3 || "";

  if (!(title && description && photo_url)) {
    res.send("Prosi vnesite naslov, vpis in povezavo do fotografije");
  } else {
    try {
      let queryResult = await DB.postTherapy(
        worker_id,
        title,
        description,
        photo_url,
        link1,
        link2,
        link3
      );
      // console.log(queryResult);
      let therapy_list = await DB.getByID(worker_id);
      console.log("therapy:  ", typeof JSON.parse(therapy_list[0].therapies));

      // console.log("prev: ", therapy_list[0].therapies);
      let new_list = JSON.parse(therapy_list[0].therapies);
      new_list.push(queryResult.insertId);
      console.log(new_list);

      // console.log(JSON.parse(new_list));
      let update_list = await DB.updateTherapyList(
        JSON.stringify(new_list),
        worker_id
      );
      res.send(queryResult);
    } catch (error) {
      console.log(error);
    }
  }
  res.end();
});

therapy.get("/:id", async (req, res) => {
  const id = req.params.id;
  // console.log(id);
  try {
    let query = await DB.getTherapyById(id);
    let worker = await DB.getByID(query[0].worker_id);
    let user_arr = JSON.parse(query[0].users);
    // console.log("user_arr: ", user_arr);
    let users = await Promise.all(
      user_arr.map(async (i) => {
        let user = await DB.getSingedUsers(i);
        // console.log("user", user);

        console.log({ username: user[0].username, id: user[0].id });
        return { username: user[0].username, id: user[0].id };
      })
    );
    console.log("called");
    console.log("users: ", users);
    query[0].worker = worker[0].username;
    query[0].users = users;
    // console.log(query[0].worker_id);
    res.send(query[0]);
  } catch (error) {
    console.log("err: ", error);
  }
  res.end();
});

therapy.post("/update", async (req, res) => {
  let id = req.body.therapy.id;
  // let worker_id = req.body.worker_id;
  let title = req.body.therapy.title;
  let description = req.body.therapy.description;
  // let photo_url = req.body.therapy.photo_url;
  let link1 = req.body.therapy.link1;
  let link2 = req.body.therapy.link2;
  let link3 = req.body.therapy.link3;

  try {
    let queryResult = await DB.updateTherapy(
      id,
      // worker_id,
      title,
      description,
      // photo_url,
      link1,
      link2,
      link3
    );
    // console.log(queryResult);

    res.send(queryResult);
  } catch (error) {
    console.log(error);
  }
  res.end();
});

therapy.post("/update_therapy_list", async (req, res) => {
  let user_id = req.body.id;
  let therapy_id = req.body.therapy_id;

  try {
    let therapy_list = await DB.getTherapyById(therapy_id);
    let list = JSON.parse(therapy_list[0].users);
    console.log(list);
    list.push(user_id);
    console.log("list", list);
    list = JSON.stringify(list);
    let query = await DB.updateTherapyTherapyList(list, therapy_id);
    console.log("result: ", query);
    res.send(query);
  } catch (error) {
    console.log(error);
  }
});

module.exports = therapy;
