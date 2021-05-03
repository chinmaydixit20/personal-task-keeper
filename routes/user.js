const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

router.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    if(!username || !email || !password) {
        return res.status(400).json({ msg: 'Please fill all fields' });
    }

    User.findOne({ username }).then(user => {
        if(user) {
            return res.status(400).json({ msg: 'Username already exists!' });
        }

        const newUser = new User({
            username,
            email,
            password
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err;
                newUser.password = hash;
                newUser.save().then(user => {

                    jwt.sign(
                        { id: user.id },
                        config.get("jwtSecret"),
                        { expiresIn: 18000 },
                        (err, token) => {
                            if(err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    username: user.username,
                                    email: user.email
                                }
                            });
                        }
                    )
                }).catch(err => {
                    return res.status(500).json({ msg: err })
                })
            })
        })
    }).catch(err => {
        return res.status(500).json({ msg: err })
    })
})

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if(!username || !password) {
        return res.status(400).json({ msg: 'Please fill all fields' });
    }

    User.findOne({ username }).then(user => {
        if(!user) {
            return res.status(400).json({ msg: 'Username does not exist!' });
        }

        bcrypt.compare(password, user.password).then(suc => {
            if(!suc) return res.status(400).json({ msg: 'Incorrect password' });

            jwt.sign(
                { id: user.id },
                config.get("jwtSecret"),
                { expiresIn: 18000 },
                (err, token) => {
                    if(err) throw err;
                    res.json({
                        token,
                        user: {
                            id: user.id,
                            username: user.username,
                            email: user.email
                        }
                    });
                }
            )
        })
    }).catch(err => {
        return res.status(401).json({ msg: err })
    })
})

router.get('/', auth, (req, res) => {
    User.findById(req.user.id)
        .select("-password")
        .then(user => {
            if(!user) {
                return res.status(401).json({ msg: "Login first!" })
            }
            return res.json(user)
        });
})

module.exports = router;