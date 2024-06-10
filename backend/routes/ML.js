const express = require('express');
const fs = require('fs');
const path = require('path');
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

    const filePath = path.resolve(__dirname, '../json/location_data.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
    
        try {
            // Parse the JSON data
            const jsonData = JSON.parse(data);
    
            // Check if the key exists and return its value
            const keyToFind = location;
            if (jsonData.hasOwnProperty(keyToFind)) {
                const value = jsonData[keyToFind];
                myList[value] = 1;    
                predict(myList).then(response => {
                    console.log('Prediction response:', response);
                    res.send({'prediction': response.prediction});
                }).catch(error => {
                    console.error('Error during prediction:', error);
                    res.send({'error':error});
                });
            } else {
                console.log(`${keyToFind} not found.`);
                res.send({'error':"Enter A Valid Location !"})
            }
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
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
