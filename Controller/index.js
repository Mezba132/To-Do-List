const express = require("express");
const bodyParser = require("body-parser");
const date = require("../ExtraModules/date");
const Item = require("../Models/indexSchema").Item();

const app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("Public"));
app.set('view engine', 'ejs');


const item1 = new Item({
    name : "make coffe"
})
const item2 = new Item({
 name : "Walk For 20 min"
})

const defaultItems = [item1,item2];

app.get("/", (req, res) => {
 const day = date.getDate();
 Item.insertMany(defaultItems, (err, foundlist) => {
  if(!err)
  {
   console.log("Successfully Saved items to db");
   // res.render("list", {worklist : day, newitems: foundlist, empty:""});
  }
 })
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

module.exports = app;

