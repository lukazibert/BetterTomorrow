const { constants } = require("buffer");
const express = require("express");
const chat = express.Router();
const DB = require("../DB/dbConnection.js");

chat.get("/get_messages", async (req, res, next) => {
  console.log(req.body.group_id);
  let group_id = req.body.group_id;
  try {
    let quaryResaults = await DB.get_messages(group_id);
    console.log(quaryResaults.body);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = chat;
