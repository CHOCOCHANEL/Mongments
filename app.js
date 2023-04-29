const express = require('express');
const app = express();
const port = 3000;
const config = require('./config/config');
const albums = require('./data/albums');

// set EJS as the view engine
app.set('view engine', 'ejs');

// Use middleware to parse the request body
app.use(express.urlencoded({ extended: true }));

// Define a route for the homepage
app.get('/', (req, res) => {
    res.render('index');
});

// Check SecretCode
app.post('/', (req, res) => {
    const secretCode = config.secretCode;
    const userCode = req.body.secretCode;

    if (userCode === secretCode) {
        console.log("Access Granted!");
        res.redirect('/album');
    } else {
        console.log("Access Denied!");
        res.redirect('/'); // * Message : Confirm your secretCode
    }
});

app.get('/album', (req, res) => {
    res.render('album.ejs', {albums : albums});
});


// Start the server
app.listen(port, () => {
    console.log(`SERVER LISTENING AT port ::: ${port}`);
});