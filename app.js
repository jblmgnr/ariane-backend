require("dotenv").config();

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

require("./models/connection");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var treesRouter = require("./routes/trees");
var membersRouter = require("./routes/members");
var uploadRouter = require("./routes/upload");
var groupsRouter = require("./routes/groups");

var app = express();

const cors = require("cors");
app.use(cors());

const fileUpload = require("express-fileupload");
app.use(fileUpload());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/trees", treesRouter);
app.use("/members", membersRouter);
app.use("/upload", uploadRouter);
app.use("/groups", groupsRouter);

module.exports = app;
