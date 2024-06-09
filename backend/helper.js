let myList = new Array(242).fill(0);
// console.log(myList);
const fs = require('fs');

// Specify the path to the JSON file
const filePath = './json/location_data.json';

// Read the JSON file
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    try {
        // Parse the JSON data
        const jsonData = JSON.parse(data);

        const keyToFind = 'Electronic City';
        if (jsonData.hasOwnProperty(keyToFind)) {
            const value = jsonData[keyToFind];
            console.log(`Value of ${keyToFind}:`, value);
        } else {
            console.log(`${keyToFind} not found.`);
        }
    } catch (error) {
        console.error('Error parsing JSON:', error);
    }
});