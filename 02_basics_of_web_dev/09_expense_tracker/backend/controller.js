const Item = require("./model");

exports.getAll = (req, res, next) => {
    Item.findAll()
        .then((item) => {
            res.json(item);
        })
        .catch((err) => console.log(err));
};

exports.getItem = (req, res, next) => {
    const itemId = req.params.itemId;
    Item.findByPk(itemId)
        .then((item) => {
            res.json(item);
        })
        .catch((err) => console.log(err));
};

exports.addItem = (req, res, next) => {
    const amount = req.body.amount;
    const description = req.body.desc;
    const category = req.body.category;
    Item.create({
        amount: amount,
        description: description,
        category: category,
    })
        .then((result) => {
            res.json(result);
        })
        .catch((err) => console.log(err));
};

exports.editItem = (req, res, next) => {
    const itemId = req.params.itemId;
    const amount = req.body.amount;
    const description = req.body.desc;
    const category = req.body.category;
    Item.findByPk(itemId)
        .then((item) => {
            item.amount = amount;
            item.description = description;
            item.category = category;
            return item.save();
        })
        .then((result) => {
            res.json(result);
        })
        .catch((err) => console.log(err));
};

exports.deleteItem = (req, res, next) => {
    const itemId = req.params.itemId;
    Item.findByPk(itemId)
        .then((item) => {
            return item.destroy();
        })
        .then((result) => {
            res.json(result);
        })
        .catch((err) => console.log(err));
};
