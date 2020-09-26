const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("Public"));
app.set('view engine', 'ejs');

const items = ["Wash Cloths","Make Coffe"];
const listItems = [];

app.get("/", (req, res) => {
 let today = new Date();
 let options = {
  weekday : "long",
  month   :  "short",
  day : "numeric"
 }
 let day = today.toLocaleDateString("en-US", options);

 res.render("list", {worklist : day, newitems: items});
});

app.post("/", (req, res) => {
 let item = req.body.additem;
 // post response using single template
 if(req.body.addbtn === "Notes")
 {
  listItems.push(item);
  res.render("list", {worklist : "Notes", newitems : listItems});
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
 res.render("about");
})

module.exports = app;

