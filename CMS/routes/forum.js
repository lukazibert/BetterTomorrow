const { constants } = require("buffer");
const express = require("express");
const forum = express.Router();
const DB = require("../DB/dbConnection.js");

//Gets all the news in the DB
forum.get("/", async (req, res, next) => {
  try {
    var queryResult = await DB.forumPosts();
    var result = await Promise.all(
      queryResult.map(async (i) => {
        var creator = await DB.getByID(i.creator_id);
        i.creator_name = creator[0].username;
        i.profile_photo = creator[0].profile_photo;
        return i;
      })
    );
    res.json(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

//Gets one new based on the id
forum.get("/:id", async (req, res, next) => {
  try {
    var queryResult = await DB.idPost(req.params.id);
    res.json(queryResult);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

//Inserts one new to the database
forum.post("/upload_post", async (req, res, next) => {
  console.log("descrition", req.body);

  let creator_id = req.body.creator_id;
  let title = req.body.title;
  let description = req.body.description;
  let article_url = req.body.article_url;
  let photo_url = req.body.photo_url;

  var isAcompleteNovica =
    title != "" && description != "" && article_url != "" && photo_url != "";
  console.log(isAcompleteNovica);
  if (isAcompleteNovica) {
    try {
      var queryResult = await DB.uploadPost(
        creator_id,
        title,
        description,
        article_url,
        photo_url
      );
      if (queryResult.affectedRows) {
        console.log("New post added!!");
      }
    } catch (err) {
      console.log(err);
      res.send("A field is missing!");
      res.sendStatus(500);
    }
  } else {
    console.log("A field is empty!!");
  }
  res.end();
});
module.exports = forum;
