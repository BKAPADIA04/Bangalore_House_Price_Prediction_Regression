const express = require('express');
const cors = require('cors');

const server = express();
const port = 8080;

server.get('/', (req, res) => {
    res.send('Hello World!');
})

server.use(cors());
server.use(express.json());

// Router Section
const mlRouter = require('./routes/ML.js');
server.use('/api',mlRouter.mlRoute);

const { spawn } = require('child_process');
const path = require('path');
const scriptPath = path.resolve(__dirname, '../final/codes/model.py');
const pythonProcess = spawn('python3', [scriptPath, 'Electronic City', 1000, 3 , 3]);

// pythonProcess.stdout.on('data', (data) => {
//     // Handle your ML model's output here
//     console.log("HI")
//     console.log(`Model output: ${data}`);
// });



// pythonProcess.stderr.on('data', (data) => {
//     console.error(`stderr: ${data}`);
// });

// pythonProcess.on('error', (error) => {
//     console.error(`Error: ${error.message}`);
// });

// pythonProcess.on('close', (code) => {
//     console.log(`Python process exited with code ${code}`);
// });

// function executePython(location, sqft, bhk, bath) {
//     const scriptPath = path.resolve(__dirname, '../final/codes/model.py');
//     const pythonProcess = spawn('python3',[scriptPath,location,sqft,bhk,bath]);
//     console.log(pythonProcess);

//     let output = '';
//     pythonProcess.stdout.on('data', (data) => {
//         output += data.toString();
//     });

//     pythonProcess.stderr.on('data', (data) => {
//         console.error(`stderr: ${data}`);
//     });

//     pythonProcess.on('error', (error) => {
//         console.error(`Error: ${error.message}`);
//     });

//     pythonProcess.on('close', (code) => {
//         console.log(`Python process exited with code ${code}`);
//         // callback(output);
//     });
//     return output;
// }

// executePython('Electronic City', 1000, 2,2, (output) => {
//     console.log(`Predicted price: ${output}`);
// });
// const ans = async (req,res) => {
    
//     const result = await executePython('../final/codes/model.py', ['Electronic City', 1000, 3 , 3]);
//     console.log(result);
//     return result;
// }
// const result = executePython(scriptPath, ['Electronic City', 1000, 3 , 3]);
// console.log(ans);

server.listen(port, () => {
    console.log(`Backend Server listening on port ${port}`);
})