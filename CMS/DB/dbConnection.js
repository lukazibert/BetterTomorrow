const mysql = require("mysql2");
const { resolve } = require("path");
// const { resolve } = require("path");
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
      `INSERT INTO user_login (username,email,password,gender,age,height,weight,therapies,pain_levels) VALUES (?,?,?,?,?,?,?,?,?)`,
      [
        username,
        email,
        password,
        "moški/ženska",
        0,
        0,
        0,
        "[]",
        `[{"name":"(sample) Bolečina v ledveni hrbtenici (1-10)","value":10}]`,
      ],
      (err, res) => {
        return err ? reject(err) : resolve(res);
      }
    );
  });
};
dataPool.AddWorker = (username, email, password, profession) => {
  return new Promise((resolve, reject) => {
    conn.query(
      `INSERT INTO worker_login (username,email,password,profession,description,links,therapies) VALUES (?,?,?,?,?,?,?)`,
      [
        username,
        email,
        password,
        profession,
        `[{"label":"Sample Description Label","data":"Lorem aute occaecat deserundunt sint ullamco eiusmod. Ex ut id cillum duis."}]`,
        `[{"label":"Sample Link Label","data":"https://sample_link.com"}]`,
        `[]`,
      ],
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

dataPool.get_messages = (group_id) => {
  return new Promise((resolve, reject) => {
    conn.query(
      `SELECT * FROM messages WHERE group_id = ?`,
      group_id,
      (err, res) => {
        return err ? reject(err) : resolve(res);
      }
    );
  });
};

dataPool.update_user = (
  id,
  username,
  gender,
  age,
  height,
  weight,
  pain_levels
) => {
  return new Promise((resolve, reject) => {
    conn.query(
      `UPDATE user_login SET username = ?, gender = ?, age = ?, height = ?, weight = ?, pain_levels = ? WHERE id = ?`,
      [username, gender, age, height, weight, pain_levels, id],
      (err, res) => {
        return err ? reject(err) : resolve(res);
      }
    );
  });
};

dataPool.update_worker = (id, username, profession, description, links) => {
  return new Promise((resolve, reject) => {
    conn.query(
      `UPDATE worker_login SET username = ?, profession = ?, description = ?, links = ? WHERE id = ?`,
      [username, profession, description, links, id],
      (err, res) => {
        return err ? reject(err) : resolve(res);
      }
    );
  });
};

dataPool.postTherapy = (
  worker_id,
  title,
  description,
  photo_url,
  link1,
  link2,
  link3
) => {
  return new Promise((resolve, reject) => {
    conn.query(
      `INSERT INTO therapies (worker_id, title, description, photo_url, link1, link2, link3, users) VALUES (?,?,?,?,?,?,?, ?)`,
      [worker_id, title, description, photo_url, link1, link2, link3, "[]"],
      (err, res) => {
        return err ? reject(err) : resolve(res);
      }
    );
  });
};

dataPool.getTherapyById = (id) => {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT * FROM therapies WHERE id = ?`, id, (err, res) => {
      return err ? reject(err) : resolve(res);
    });
  });
};

dataPool.updateTherapyList = (list, id) => {
  return new Promise((resolve, reject) => {
    conn.query(
      `UPDATE worker_login SET therapies = ? WHERE id = ?`,
      [list, id],
      (err, res) => {
        return err ? reject(err) : resolve(res);
      }
    );
  });
};

dataPool.updateUserTherapyList = (list, id) => {
  return new Promise((resolve, reject) => {
    conn.query(
      `UPDATE user_login SET therapies = ? WHERE id = ?`,
      [list, id],
      (err, res) => {
        return err ? reject(err) : resolve(res);
      }
    );
  });
};
dataPool.updateTherapyTherapyList = (list, id) => {
  return new Promise((resolve, reject) => {
    conn.query(
      `UPDATE therapies SET users = ? WHERE id = ?`,
      [list, id],
      (err, res) => {
        return err ? reject(err) : resolve(res);
      }
    );
  });
};
dataPool.getSingedUsers = (id) => {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT * FROM user_login WHERE id = ?`, id, (err, res) => {
      return err ? reject(err) : resolve(res);
    });
  });
};

dataPool.getUserByID = (id) => {
  return new Promise((resolve, reject) => {
    conn.query(
      "SELECT * FROM user_login WHERE id = ?",
      id,
      (err, res, fields) => {
        return err ? reject(err) : resolve(res);
      }
    );
  });
};

dataPool.updateTherapy = (
  id,
  // worker_id,
  title,
  description,
  // photo_url,
  link1,
  link2,
  link3
) => {
  return new Promise((resolve, reject) => {
    conn.query(
      `UPDATE therapies SET title = ?, description = ?, link1 = ?, link2 = ?, link3 = ? WHERE id = ?`,
      [title, description, link1, link2, link3, id],
      (err, res, fields) => {
        return err ? reject(err) : resolve(res);
      }
    );
  });
};

module.exports = dataPool;
