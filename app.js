const express = require("express");
const app = express();
const port = 3000;

// Define a route for the homepage
app.get('/', (req, res) => {
    res.send("Hello Our Mongments!");
});

// Start the server
app.listen(port, () => {
    console.log(`SERVER STARTED ON PORT ${3000}`);
});