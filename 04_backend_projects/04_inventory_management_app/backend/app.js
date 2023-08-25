const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require('dotenv').config();

const sequelize = require("./database");
const adminRoute = require("./route");

const app = express();
app.use(cors());
app.use(bodyParser.json({ extended: false }));

app.use(adminRoute);

sequelize
    .sync()
    .then((res) => {
        app.listen(3000);
    })
    .catch((err) => console.log(err));
