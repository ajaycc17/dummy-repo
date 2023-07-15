const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const loginRoutes = require("./routes/login");

app.use(bodyParser.urlencoded({ extended: false }));

// will change /add-product and /product to /admin/add-product and /admin/product
app.use("/admin", adminRoutes);
app.use("/shop", shopRoutes);
app.use(loginRoutes);

// for 404 error
app.use((req, res, next) => {
    res.status(404).send("<h1>Page not found</h1>");
});

app.listen(3000);
