const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.set('view engine', 'ejs');

var items = ["Wash Cloths","Make Coffe"];

app.get("/", (req, res) => {
 let today = new Date();
 let day = today.toDateString();

 res.render("list", {tday : day, newitems: items});
});

app.post("/", (req, res) => {
 let item = req.body.additem;
 items.push(item);
 res.redirect("/");
})

module.exports = app;

