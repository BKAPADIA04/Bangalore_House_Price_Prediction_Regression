const express = require('express');
const mlRouter= express.Router();

const { body } = require('express-validator');

mlRouter.get('/', (req, res) => {
    res.send('Welcome to Bangalore !');
})

exports.mlRoute = mlRouter;