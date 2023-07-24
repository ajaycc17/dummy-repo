const Expense = require("../models/expense");
const User = require("../models/user");
const sequelize = require("../utils/database");

exports.getAllExpenses = (req, res, next) => {
    req.user
        .getExpenses() //magic method
        // Expense.findAll({ where: { userId: req.user.id } })
        .then((expenses) => {
            res.status(200).json({
                data: expenses,
                isPremium: req.user.isPremiumUser,
            });
        })
        .catch((err) => res.status(500).json({ message: err }));
};

exports.getOneExpense = (req, res, next) => {
    const expId = req.params.itemId;
    req.user
        .getExpenses({ where: { id: expId } })
        .then((expenses) => {
            const expense = expenses[0];
            res.status(200).json(expense);
        })
        .catch((err) => res.status(404).json({ message: err }));
};

exports.addNewExpense = async (req, res, next) => {
    const t = await sequelize.transaction();
    const expense = req.body.amount;
    const desc = req.body.desc;
    const category = req.body.category;
    try {
        const newExpense = await Expense.create(
            {
                expense: expense,
                description: desc,
                category: category,
                userId: req.user.id,
            },
            { transaction: t }
        );
        const totalExpense = Number(req.user.totalExpense) + Number(expense);
        const user = await User.update(
            { totalExpense: totalExpense },
            {
                where: { id: req.user.id },
                transaction: t,
            }
        );

        await t.commit();
        res.status(200).json({
            success: true,
            message: "New expense added successfully.",
            data: newExpense,
        });
    } catch (err) {
        await t.rollback();
        res.status(500).json({ message: err });
    }
};

exports.editExpense = async (req, res, next) => {
    const t = await sequelize.transaction();
    const expId = req.params.itemId;
    const expense = req.body.amount;
    const desc = req.body.desc;
    const category = req.body.category;
    try {
        const items = await req.user.getExpenses({
            where: { id: expId },
            transaction: t,
        });
        const item = items[0];
        const oldExpense = item.expense;
        item.expense = expense;
        item.description = desc;
        item.category = category;
        await item.save();

        const user = await User.findOne({
            where: { id: req.user.id },
            transaction: t,
        });
        user.totalExpense = user.totalExpense - oldExpense + Number(expense);
        await user.save();
        await t.commit();

        res.status(200).json({
            success: true,
            message: "Expense edited successfully.",
            data: item,
        });
    } catch (err) {
        await t.rollback();
        res.status(500).json({ message: err });
    }
};

exports.deleteExpense = async (req, res, next) => {
    const t = await sequelize.transaction();
    const expId = req.params.itemId;
    try {
        const items = await req.user.getExpenses({
            where: { id: expId },
            transaction: t,
        });
        const item = items[0];
        const oldExpense = item.expense;
        await item.destroy();

        const user = await User.findOne({
            where: { id: req.user.id },
            transaction: t,
        });
        user.totalExpense = user.totalExpense - oldExpense;
        await user.save();

        await t.commit();
        res.status(200).json({
            success: true,
            message: "Expense deleted successfully.",
        });
    } catch (err) {
        await t.rollback();
        res.status(500).json({ message: err });
    }
};
