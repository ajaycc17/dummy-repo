const express = require("express");

const expenseController = require("../controllers/expense");

const router = express.Router();

router.get("/", expenseController.getExpenses);
router.get("/get-expence/:itemId", expenseController.getExpense);
router.post("/add-expense", expenseController.addExpense);
router.post("/edit-expense/:itemId", expenseController.editExpense);
router.post("/delete-expense/:itemId", expenseController.deleteExpense);

module.exports = router;
