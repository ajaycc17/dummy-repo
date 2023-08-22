"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let todos = [];
const router = (0, express_1.Router)();
router.get("/", (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post("/todo", (req, res, next) => {
    const body = req.body;
    const newTodo = {
        id: new Date().toISOString(),
        text: body.textData,
    };
    todos.push(newTodo);
    res.status(201).json({
        message: "Added todo",
        todo: newTodo,
        todos: todos,
    });
});
router.put("/todo/:todoId", (req, res, next) => {
    const params = req.params;
    const body = req.body;
    const tId = params.todoId;
    const todoIndex = todos.findIndex((todoItem) => todoItem.id === tId);
    if (todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text: body.textData };
        res.status(200).json({ message: "Updated todo", todos: todos });
    }
    else {
        res.status(404).json({ message: "Could not find a todo" });
    }
});
router.delete("/todo/:todoId", (req, res, next) => {
    const params = req.params;
    const tId = params.todoId;
    const todoIndex = todos.findIndex((todoItem) => todoItem.id === tId);
    if (todoIndex < 0) {
        res.status(404).json({ message: "Could not find a todo" });
    }
    todos = todos.filter((todoItem) => todoItem.id !== params.todoId);
    res.status(200).json({ message: "Deleted todo", todos: todos });
});
exports.default = router;
