const { constants } = require("buffer");
const express = require("express");
const therapy = express.Router();
const DB = require("../DB/dbConnection.js");

//get therpies by users id
therapy.get("/user/:therapies", async (req, res) => {
  console.log(req.params);
  let therapies_arr = req.params.therapies.split(",");
  try {
    var queryResult = await DB.GetUserTherapies(therapies_arr);
    res.json(queryResult);
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

module.exports = therapy;
