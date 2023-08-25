const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "anunami", {
    dialect: "mysql",
    host: "localhost",
});

module.exports = sequelize;
