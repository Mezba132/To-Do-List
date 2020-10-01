const express = require("express");
const app = express();

const route = require("./Controller/index");
app.use(route);

// let port = process.env.PORT;
// if(port === null || port === "")
// {
//     port = 3000;
// }

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is Running Successfully !!");
})