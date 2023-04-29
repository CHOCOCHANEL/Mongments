const express = require('express');
const app = express();
const PORT = 3000;
const config = require('./config/config');

// set EJS as the view engine
app.set('view engine', 'ejs');

// Use middleware to parse the request body
app.use(express.urlencoded({ extended: true }));

// Define a route for the homepage
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/', (req, res) => {
    const secretCode = config.secretCode;
    const userCode = req.body.secretCode;

    if (userCode === secretCode) {
        res.send("Access Granted!");
    } else {
        res.send("Access Denied!");
    }
    
});

// Start the server
app.listen(PORT, () => {
    console.log(`SERVER LISTENING AT PORT ::: ${PORT}`);
});