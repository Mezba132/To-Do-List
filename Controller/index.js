const express = require("express");
const bodyParser = require("body-parser");
const date = require("../ExtraModules/date");

const app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("Public"));
app.set('view engine', 'ejs');

const items = ["Make Coffe","Cook Food"];
const listItems = [];

app.get("/", (req, res) => {
 const day = date.getDate();
 res.render("list", {worklist : day, newitems: items});
});

app.post("/", (req, res) => {
 let item = req.body.additem;
 // post response using single template
 if(req.body.addbtn === "Notes")
 {
  listItems.push(item);
  res.render("list", { worklist : "Notes", newitems : listItems});
 }
 else
 {
  items.push(item);
  res.redirect("/");
 }
});

// Reuse list Template
app.get("/work", (req, res) => {
 res.render("list", {worklist : "Notes", newitems : listItems});
});

app.get("/about", (req, res) => {
 const day = date.getDay();
 res.render("about", {worklist : day});
})

module.exports = app;

