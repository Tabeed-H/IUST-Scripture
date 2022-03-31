const express = require("express");
const fs = require("fs");
const path = require("path");
const db = require("./db/db");
const bodyParser = require("body-parser");
// express middle ware
const app = express();

//setting up the port for server dynamically
app.use(bodyParser.urlencoded({ extended: true }));
//setting up the statc assets directory like images stylesheets scripts etc
const pubDirPath = path.join(__dirname, "/public");
app.use(express.static(pubDirPath));
app.use(express.json());
///setting up the view engine for advanced templating
//app.set('view engine','hbs')
// view engine setup
app.set("views", path.join(__dirname, "/views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
// PORT setup
const PORT = process.env.PORT || 5000;

// main
app.get("/", (req, res) => {
  res.render("index");
});

//import Routes and Files here
const errorController = require("./middleware/error.controller");
const quraanRoutes = require("./modules/quraan/quraan.routes");
const userRoutes = require("./modules/user/user.routes");
const chapterRoutes = require("./modules/chapter/chapter.routes");

//use the import
app.use(quraanRoutes);
app.use(userRoutes);
app.use(chapterRoutes);
app.use(errorController);

// Server Startup
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Server Running on PORT ${PORT}`);
});
