const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const date = require("../ExtraModules/date");
const Item = require("../Models/indexSchema").Item();
const List = require("../Models/indexSchema").List();
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

 Item.find({}, (err, founditems) => {
  if(founditems.length === 0)
  {
    Item.insertMany(defaultItems, (err) => {
     if(!err)
     {
      console.log("Successfully Saved items to db");
      res.redirect("/");
     }
    })
  }
  else {
   res.render("list", {listTitle : day, newitems: founditems, empty:""});
  }
 })
});

app.get("/:customlist", (req, res) => {
    const customListName = _.capitalize(req.params.customlist);
    const emptyItems = [];
    console.log(customListName);
    List.findOne({name : customListName}, (err, foundlist) => {
     if(!err)
     {
         if(foundlist)
         {
             res.render("list", {listTitle : foundlist.name, newitems : foundlist.items, empty:""});
         }
         else {
             const lists = new List({
                 name : customListName,
                 items : emptyItems
             })
             lists.save();
             res.redirect("/" + customListName);
         }
     }
    })
})



app.post("/", (req, res) => {
 const itemName = req.body.additem;
 const listTitle = req.body.addbtn;

 const item = new Item({
  name : itemName
 })

 // post response using single template
 if(listTitle === date.getDate())
 {
  if(itemName == "")
  {
   Item.find({}, (err, founditems) => {
    if(!err)
    {
     return res.render("list",{ listTitle : date.getDate(), newitems : founditems, empty : "List Item is Empty !!"});
    }
   })
  }
  else {
   item.save();
   res.redirect("/");
  }
 }
 else
 {
  console.log("Working On it");
 }
});

app.post("/delete", (req, res) => {
  const checkedItem = req.body.checkbox;
  console.log(checkedItem);
  Item.findByIdAndRemove(checkedItem, (err) => {
   if(!err)
   {
     res.redirect("/");
   }
  })
})

module.exports = app;

