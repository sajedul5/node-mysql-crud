const express = require('express');
const bodyPaser = require('body-parser');


// create express app
const app = express();

//setup the server port
const port = process.env.PORT || 5000;

// parse request data content type application/x-www-form-rulencoded
app.use(bodyPaser.urlencoded({extended: false}));

// parse request data content type application/json
app.use(bodyPaser.json());

// define root route
app.get('/', (req, res) => {
    res.send('Hello Shakil');
});

//import employee routes
const employeeRoutes = require('./src/routes/employeeRoute');

// create employee routes
app.use('/api/employee', employeeRoutes);


// listen to the port
app.listen(port, () => {
    console.log(`Express Server is running at http://localhost:${port}`);
})