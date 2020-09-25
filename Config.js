const express = require("express");

const app = express();

const route = require("./Controller/index");
app.use(route);

app.listen(3000, () => {
    console.log("Server is Running on Port 3000");
})