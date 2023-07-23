const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const sequelize = require("./utils/database");
const adminRoutes = require("./routes/admin");
const expenseRoutes = require("./routes/expense");

const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: false }));

app.use("/user", adminRoutes);
app.use("/expense", expenseRoutes);

sequelize
    .sync()
    .then((res) => {
        app.listen(3000);
    })
    .catch((err) => console.log(err));
