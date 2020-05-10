const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.patch('/:id', (req, res, next) => {
    User.updateOne({
        _id: req.params.id
    }, {
        $set: {
            "request.isAccepted": true
        }
    }).then(
        () => {
            res.status(201).json({
                message: 'Request Accepted successfully!'
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