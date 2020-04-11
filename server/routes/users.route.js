require('../../config/config');
const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const User = require('../models/user.model');
const app = express();

app.get('/users', (req, res) => {
    let from = Number(req.query.from) || 0;
    let page = Number(req.query.page) || 5;
    let active = req.query.active || true;
    User.find({ active })
        .skip(from)
        .limit(page)
        .exec((err, users) => {
            if (err) {
                res.status(400).json(err);
            } else if (users && users.length == 0) {
                res.status(204).json({
                    message: "Data not found"
                });
            } else {
                User.countDocuments({ active }, (err, count) => {
                    if (err) {
                        res.status(400).json(err);
                    } else {
                        res.json({
                            data: users,
                            count: count
                        });
                    }
                });
            }
        });
});

app.post('/users', (req, res) => {
    let body = req.body;
    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, parseInt(process.env.BCRYPT_ROUNDS)),
        role: body.role
    });
    user.save((err, userDB) => {
        if (err) {
            res.status(400).json(err);
        } else {
            res.json(userDB);
        }
    });
});

app.put('/users/:id', (req, res) => {
    let id = req.params.id;
    let user = _.pick(req.body, ['name', 'email', 'photo', 'role', 'active']);
    User.findByIdAndUpdate(id, user, { new: true, runValidators: true, context: 'query' }, (err, userDB) => {
        if (err) {
            res.status(400).json(err);
        } else {
            res.json(userDB);
        }
    });
});

app.delete('/users/:id', (req, res) => {
    let id = req.params.id;
    User.findByIdAndUpdate(
        id,
        { active: false },
        { new: true, runValidators: true, context: 'query' },
        (err, userDB) => {
            if (err) {
                res.status(400).json(err);
            } else {
                if(!userDB) {
                    res.status(400).json({
                        message: `User with id ${id} not found`
                    });
                } else {
                    res.json(userDB);
                }
            }
        });
});

module.exports = app;