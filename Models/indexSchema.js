const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/todolistsDB', {useNewUrlParser: true, useUnifiedTopology: true});

exports.Item = () => {
    const dailySchema = {
        name : String
    }
    const Item  = mongoose.model("Item", dailySchema);
    return Item;
}

