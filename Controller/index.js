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
 res.render("list", {worklist : day, newitems: items, empty:""});
});

app.post("/", (req, res) => {
 let item = req.body.additem;
 // post response using single template
 if(req.body.addbtn === "Notes")
 {
  if(item == "")
  {
   res.render("list",{ worklist : "Notes", newitems : listItems, empty : "List Item is Empty !!"})
  }
  else {
   listItems.push(item);
   res.render("list", { worklist : "Notes", newitems : listItems, empty : ""});
  }
 }
 else
 {
  if(item == "")
  {
   const day = date.getDate();
   res.render("list",{ worklist : day, newitems : items, empty : "List Item is Empty !!"})
  }
  else {
   items.push(item);
   res.redirect("/");
  }
 }
});

// Reuse list Template
app.get("/work", (req, res) => {
 res.render("list", {worklist : "Notes", newitems : listItems, empty : ""});
});

app.get("/about", (req, res) => {
 const day = date.getDay();
 res.render("about", {worklist : day});
})

module.exports = app;

