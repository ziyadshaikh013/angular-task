const express = require('express');
const User = require('../models/user');
const Admin = require('../models/admin')
const router = express.Router();


router.post('/adduser', (req, res, next) => {

    if (req.body.role == "admin") {

        let admin = new Admin({
            email: req.body.email,
            password: req.body.password,
        })

        admin.save().then(
            () => {
                res.status(201).json({
                    message: 'Admin added successfully'
                })
            }
        ).catch(
            (err) => {
                res.status(500).json({
                    message: 'error while creating new user',
                    err
                })
            }
        )
    } else {

        let user = new User({
            email: req.body.email,
            password: req.body.password,
        })

        user.save().then(
            () => {
                res.status(201).json({
                    message: 'user added successfully'
                })
            }
        ).catch(
            (err) => {
                res.status(500).json({
                    message: 'error while creating new user',
                    err
                })
            }
        )
    }

});

router.get('/:id', (req, res, next) => {
    User.findOne({
        _id: req.params.id
    }).then(
        (user) => {
            res.status(200).json(user);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                message: "No User Found",
                error
            })
        }
    )
});

router.post('/login', (req, res, next) => {
    if (req.body.role == "admin") {
        Admin.findOne({
                email: req.body.email
            })
            .then(user => {
                if (!user) {
                    return res.status(401).json({
                        message: "User not found"
                    });
                }

                if (user.password == req.body.password) {
                    res.status(200).json({
                        user
                    })
                } else {
                    res.status(500).json({
                        message: "incorrect password"
                    })
                }
            })
    } else {
        User.findOne({
                email: req.body.email
            })
            .then(user => {
                if (!user) {
                    return res.status(401).json({
                        message: "User not found"
                    });
                }

                if (user.password == req.body.password) {
                    res.status(200).json({
                        user
                    })
                } else {
                    res.status(500).json({
                        message: "incorrect password"
                    })
                }
            })
    }

});

router.get('/', (req, res, next) => {
    User.find().then((users) => {
        return res.status(200).json(users);
    }).catch(() => {
        return res.status(400).json({
            message: 'no user found'
        })
    })
});

router.patch('/:id', (req, res, next) => {

    user = {
        "isRequest": true,
        "request.sender": req.body.sender,
        "request.subject": req.body.subject
    }

    User.updateOne({
        _id: req.params.id
    }, {
        $set: user
    }).then(
        () => {
            res.status(201).json({
                message: 'Request Sent successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});

module.exports = router;