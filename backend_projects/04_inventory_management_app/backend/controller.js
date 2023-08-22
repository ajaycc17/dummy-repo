const Item = require("./model");

exports.getInventory = (req, res, next) => {
    Item.findAll()
        .then((item) => {
            console.log(item);
            res.json(item);
        })
        .catch((err) => console.log(err));
};

exports.getItem = async (req, res, next) => {
    const itemId = req.params.itemId;
    try {
        const item = await Item.findByPk(itemId);
        res.json(item);
    } catch {
        console.log(err);
    }
};

exports.addItem = (req, res, next) => {
    console.log("body", req.body.title);
    const title = req.body.title;
    const desc = req.body.desc;
    const price = req.body.price;
    const qty = req.body.qty;
    Item.create({
        title: title,
        description: desc,
        price: price,
        quantity: qty,
    })
        .then((item) => {
            res.json(item);
        })
        .catch((err) => console.log(err));
};

exports.editItem = (req, res, next) => {
    const itemId = req.params.itemId;
    const title = req.body.title;
    const desc = req.body.desc;
    const price = req.body.price;
    const qty = req.body.qty;
    Item.findByPk(itemId)
        .then((item) => {
            item.title = title;
            item.description = desc;
            item.price = price;
            item.quantity = qty;
            return item.save();
        })
        .then((result) => {
            res.json(result);
        })
        .catch((err) => console.log(err));
};

exports.buyItem = (req, res, next) => {
    const itemId = req.params.itemId;
    const amt = req.params.amount;
    Item.findByPk(itemId)
        .then((item) => {
            item.quantity = item.quantity - amt;
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
