const mysql = require("mysql2");
const { resolve } = require("path");
// const therapy = require("../routes/therapy");

//database config
const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "SISIII2022_89191218",
});

//connect to database
conn.connect((err, data) => {
  if (err) {
    console.log("ERROR: " + err.message);
    return;
  } else {
    console.log("DATA: " + data);
    console.log("Connection established");
    return;
  }
});

let dataPool = {};

//get all posts
dataPool.forumPosts = () => {
  return new Promise((resolve, reject) => {
    conn.query("SELECT * FROM posts ORDER BY id DESC", (err, res) => {
      return err ? reject(err) : resolve(res);
    });
  });
};

//get post by id
dataPool.idPost = (id) => {
  return new Promise((resolve, reject) => {
    conn.query("SELECT * FROM posts WHERE id = ?", id, (err, res) => {
      return err ? reject(err) : resolve(res);
    });
  });
};

//upload new post
dataPool.uploadPost = (
  creator_id,
  title,
  description,
  article_url,
  photo_url
) => {
  return new Promise((resolve, reject) => {
    conn.query(
      "INSERT INTO posts (creator_id,title,description,article_url,photo_url) VALUES (?,?,?,?,?)",
      [creator_id, title, description, article_url, photo_url],
      (err, res) => {
        return err ? reject(err) : resolve(res);
      }
    );
  });
};

//authentication
dataPool.AuthUser = (username) => {
  return new Promise((resolve, reject) => {
    conn.query(
      "SELECT * FROM user_login WHERE username = ?",
      username,
      (err, res) => {
        return err ? reject(err) : resolve(res);
      }
    );
  });
};
dataPool.AuthWorker = (username) => {
  return new Promise((resolve, reject) => {
    conn.query(
      "SELECT * FROM worker_login WHERE username = ?",
      username,
      (err, res, fields) => {
        return err ? reject(err) : resolve(res);
      }
    );
  });
};

//adding user data entries
dataPool.AddUser = (username, email, password) => {
  return new Promise((resolve, reject) => {
    conn.query(
      `INSERT INTO user_login (username,email,password,profile_photo,gender,age,height,weight) VALUES (?,?,?,?,?,?,?,?)`,
      [username, email, password, "", "", 0, 0, 0],
      (err, res) => {
        return err ? reject(err) : resolve(res);
      }
    );
  });
};
dataPool.AddWorker = (username, email, password, photo_url, profession) => {
  return new Promise((resolve, reject) => {
    conn.query(
      `INSERT INTO worker_login (username,email,password,profile_photo,profession) VALUES (?,?,?,?,?)`,
      [username, email, password, photo_url, profession],
      (err, res, fields) => {
        return err ? reject(err) : resolve(res);
      }
    );
  });
};

//get user object by id
dataPool.getByID = (id) => {
  return new Promise((resolve, reject) => {
    conn.query(
      "SELECT * FROM worker_login WHERE id = ?",
      id,
      (err, res, fields) => {
        return err ? reject(err) : resolve(res);
      }
    );
  });
};

//create new chat
dataPool.createChat = (theme, user_id, worker_id) => {
  return new Promise((resolve, reject) => {
    conn.query(
      `INSERT INTO chats (theme,user_id,worker_id) VALUES (?,?,?,?,?)`,
      [theme, user_id, worker_id],
      (err, res, fields) => {
        return err ? reject(err) : resolve(res);
      }
    );
  });
};

//get therapies for user
dataPool.GetUserTherapies = (therapies_arr) => {
  let therapies = "";
  for (let index = 0; index < therapies_arr.length; index++) {
    if (index == therapies_arr.length - 1) {
      therapies += `worker_id = ${therapies_arr[index]}`;
    } else {
      therapies += `worker_id = ${therapies_arr[index]} OR `;
    }
  }
  return new Promise((resolve, reject) => {
    conn.query(`SELECT * FROM therapies WHERE ` + therapies, (err, res) => {
      return err ? reject(err) : resolve(res);
    });
  });
};

//get therapies for worker
dataPool.GetWorkerTherapies = (id) => {
  return new Promise((resolve, reject) => {
    conn.query(
      `SELECT * FROM therapies WHERE worker_id = ?`,
      id,
      (err, res) => {
        return err ? reject(err) : resolve(res);
      }
    );
  });
};

module.exports = dataPool;
