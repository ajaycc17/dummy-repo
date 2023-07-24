const User = require("../models/user");
const Expense = require("../models/expense");

const sequelize = require("../utils/database");

exports.leaderBoard = async (req, res, next) => {
    try {
        const expenses = await Expense.findAll({
            attributes: [
                "userId",
                [sequelize.fn("sum", sequelize.col("expense")), "totalExpense"],
            ],
            group: "userId",
        });
        const users = await User.findAll();

        const arr = [];
        const userlen = users.length;
        const explen = expenses.length;

        for (let i = 0; i < userlen; i++) {
            let netExpense = 0;
            for (let j = 0; j < explen; j++) {
                if (users[i].id === expenses[j].userId) {
                    netExpense = expenses[j].dataValues.totalExpense;
                    break;
                }
            }
            arr.push({ name: users[i].name, expense: netExpense });
        }
        arr.sort((a, b) => {
            return b.expense - a.expense;
        });
        res.status(200).json(arr);
    } catch (err) {
        console.log(err);
        res.status(403).json({ message: "Something went wrong", error: err });
    }
};
