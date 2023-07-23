const Sequelize = require("sequelize");

const sequelize = new Sequelize("expense-tracker", "root", "anunami", {
    dialect: "mysql",
    host: "localhost",
});

module.exports = sequelize;
