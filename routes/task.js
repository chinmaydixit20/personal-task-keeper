const router = require('express').Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');


router.post('/new', auth, (req, res) => {
    const { name, description, datetime } = req.body;

    const newTask = new Task({
        name,
        description,
        datetime,
        creator: req.user.id
    })

    newTask.save().then(task => {
        return res.json(task)
    }).catch(err => {
        return res.status(400).json({ msg: err })
    })
})

router.delete('/:id', auth, (req, res) => {
    const id = req.params.id;
    Task.findOneAndDelete({
        _id: id,
        creator: req.user.id
    }).then(task => {
        res.json({ msg: "Task deleted successfully" });
    }).catch(err => {
        return res.status(501).json({ msg: err })
    })
})

router.put('/:id', auth, (req, res) => {
    const id = req.params.id;
    Task.findOneAndUpdate({
        _id: id,
        creator: req.user.id
    }, req.body, {
        new: true
    }).then(task => {
        res.json(task)
    }).catch(err => {
        return res.status(501).json({ msg: err })
    })
})

router.get('/', auth, (req, res) => {
    Task.find({
        creator: req.user.id
    }).sort({
        datetime: 1
    }).then(tasks => {
        res.json(tasks)
    }).catch(err => {
        return res.status(501).json({ msg: err })
    })
})


module.exports = router;