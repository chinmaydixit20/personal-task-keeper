const router = require('express').Router();
const Task = require('../models/Task');

router.route('/new').post((req, res) => {
    const { name, description, date } = req.body;
    const newTask = new Task({
        name: req.body.name,
        description: req.body.description,
        datetime: req.body.datetime,
        creator: req.body.creator
    })
})

module.exports = router;