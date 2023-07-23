const Expense = require("../models/expense");

exports.getExpenses = (req, res, next) => {
    Expense.findAll()
        .then((expenses) => {
            res.status(200).json(expenses);
        })
        .catch((err) => res.status(500).json({ message: err }));
};

exports.getExpense = (req, res, next) => {
    const expId = req.params.itemId;
    Expense.findByPk(expId)
        .then((expense) => {
            res.status(200).json(expense);
        })
        .catch((err) => res.status(404).json({ message: err }));
};

exports.addExpense = (req, res, next) => {
    const expense = req.body.amount;
    const desc = req.body.desc;
    const category = req.body.category;

    Expense.create({
        expense: expense,
        description: desc,
        category: category,
    })
        .then((expense) => {
            res.status(200).json({
                success: true,
                message: "New expense added successfully.",
                data: expense,
            });
        })
        .catch((err) => {
            res.status(500).json({ message: err });
        });
};

exports.editExpense = (req, res, next) => {
    const expId = req.params.itemId;
    const expense = req.body.amount;
    const desc = req.body.desc;
    const category = req.body.category;

    Expense.findByPk(expId)
        .then((item) => {
            item.expense = expense;
            item.description = desc;
            item.category = category;
            return item.save();
        })
        .then((item) => {
            res.status(200).json({
                success: true,
                message: "Expense edited successfully.",
                data: item,
            });
        })
        .catch((err) => {
            res.status(500).json({ message: err });
        });
};

exports.deleteExpense = (req, res, next) => {
    const expId = req.params.itemId;

    Expense.findByPk(expId)
        .then((item) => {
            return item.destroy();
        })
        .then((result) => {
            res.status(200).json({
                success: true,
                message: "Expense deleted successfully.",
                data: result,
            });
        })
        .catch((err) => {
            res.status(500).json({ message: err });
        });
};
