const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/signup', async(req, res) => {
    try {
        const user = new User(req.body);
        console.log(user);
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/login', async(req, res) => {
    //Login a registered user
    try {
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password);
        console.log(user);
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'});
        }
        console.log('$$')
        const token = await user.generateAuthToken();
        console.log('token', token);
        res.send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
});


module.exports = {
    path: '/auth',
    router
};