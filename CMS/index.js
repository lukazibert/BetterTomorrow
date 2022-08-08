const express = require("express");
const dontev = require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();
const port = 5111;

const DB = require("./DB/dbConnection");

//Configs
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://88.200.63.148:3111"],
    methods: ["GET", "POST", "OPTIONS", "HEAD"],
    credentials: true,
  })
);
app.use(cookieParser("some secret"));
app.use(
  session({
    key: "user",
    secret: "some secret",
    saveUninitialized: true,
    name: "User session",
    resave: false,
    cookie: {
      secure: false,
      expires: 1000 * 60 * 60 * 24,
      sameSite: false,
    },
  })
);

//Routes
const users = require("./routes/users");
const workers = require("./routes/workers");
const forum = require("./routes/forum");
const chat = require("./routes/chat");
const therapy = require("./routes/therapy");
const login = require("./routes/login");

app.use("/users", users);
app.use("/workers", workers);
app.use("/forum", forum);
app.use("/chat", chat);
app.use("/therapy", therapy);
app.use("/login", login);

// app.get("/", (req, res) => {
//   res.send("hello");
// });

///App listening on port
app.listen(process.env.PORT || port, () => {
  console.log(`Server is running on port: ${process.env.PORT || port}`);
});
