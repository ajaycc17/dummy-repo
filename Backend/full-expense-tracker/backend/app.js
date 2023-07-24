const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const Expense = require("./models/expense");
const User = require("./models/user");
const Order = require("./models/orders");

const sequelize = require("./utils/database");
const adminRoutes = require("./routes/admin");
const expenseRoutes = require("./routes/expense");
const purchaseRoutes = require("./routes/purchase");
const premiumRoutes = require("./routes/premium");
const passwordRoutes = require("./routes/password");

const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: false }));

app.use("/user", adminRoutes);
app.use("/expense", expenseRoutes);
app.use("/purchase", purchaseRoutes);
app.use("/premium", premiumRoutes);
app.use("/password", passwordRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

sequelize
    // .sync({ force: true })
    .sync()
    .then((res) => {
        app.listen(3000);
    })
    .catch((err) => console.log(err));
