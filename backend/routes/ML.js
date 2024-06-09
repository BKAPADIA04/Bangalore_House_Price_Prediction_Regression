const express = require('express');
const fs = require('fs');
const mlRouter= express.Router();

const { body } = require('express-validator');

mlRouter.get('/', (req, res) => {
    res.send('Welcome to Bangalore !');
})

mlRouter.post('/prediction',(req,res) => {
    const { location , sqft , bhk , bath } = req.body;
    let myList = new Array(242).fill(0);
    // console.log(myList);
    myList[0] = sqft
    myList[1] = bath
    myList[2] = bhk

    try {   
        const jsonData = JSON.parse(myList);
        const keyToFind = location;
        if (jsonData.hasOwnProperty(keyToFind)) {
            const value = jsonData[keyToFind];
            myList[value] = 1;
        } 
    } catch (error) {
        console.error('Error parsing JSON:', error);
    }
    // console.log(myList);
    predict(myList).then(response => {
        console.log('Prediction response:', response);
        res.send({'prediction': response.prediction});
    }).catch(error => {
        console.error('Error during prediction:', error);
        res.send({'error':error});
    });
})

exports.mlRoute = mlRouter;

const axios = require('axios');
async function predict(inputData) {
    try {
        const response = await axios.post('http://127.0.0.1:5000/predict', {
            data: inputData
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// const inputData = [15000, 4, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// predict(inputData).then(response => {
//     console.log('Prediction response:', response);
// }).catch(error => {
//     console.error('Error during prediction:', error);
// });
