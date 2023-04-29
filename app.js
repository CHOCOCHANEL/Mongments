const express = require("express");
const app = express();
const port = 3000;

// set EJS as the view engine
app.set('view engine', 'ejs');

// Define a route for the homepage
app.get('/', (req, res) => {
    res.render('index');
});

// Start the server
app.listen(port, () => {
    console.log(`SERVER STARTED ON PORT ${3000}`);
});