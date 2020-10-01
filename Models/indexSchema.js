const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/todolistsDB', {useNewUrlParser: true, useUnifiedTopology: true});

exports.Item = () => {
    const ItemSchema = {
        name : String
    }
    const Item  = mongoose.model("Item", ItemSchema);
    return Item;
}

exports.List = () => {
    const listSchema = {
        name : String,
        items : [{ name : String }]
    }
    const List = mongoose.model("List", listSchema);
    return List;
}

