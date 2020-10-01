const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://admin-mezba:mezba017529@cluster0.y37cv.mongodb.net/ToDoListDB', {useNewUrlParser: true, useUnifiedTopology: true});

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

