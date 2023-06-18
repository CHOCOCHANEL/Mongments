const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const PORT = 3000;
const config = require('./static/config/config');

// set EJS as the view engine
app.set('view engine', 'ejs');

// use middlewares
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static")));

// Define a route for the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/login.html'));
});

app.post('/auth', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    if (username && password) {
        if (config.users[username] === btoa(password)) {
            // Authenticate the user
            req.session.loggedin = true;
            req.session.username = username;
            // Redirect to home page
            res.redirect('/home');
        } else {
            res.send('Incorrect Username or Password!');
        }
        res.end();
    } else {
        res.send('Please enter Username and Password');
        res.end();
    }
});

app.get('/home', (req, res) => {
    if (req.session.loggedin) {
        res.send(`Welcome ${req.session.username}`);
    } else {
        res.send('Please login to view this page!');
    }
    res.end();
});

app.get('/album', (req, res) => {
    res.render('album.ejs', {albums : albums});
});


// Start the server
app.listen(PORT, () => {
    console.log(`SERVER LISTENING AT port ::: ${PORT}`);
});