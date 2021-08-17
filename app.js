const express = require('express');
const flash = require('connect-flash');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const Routes = require('./routes/index');

require('dotenv').config();

// Initialize express
const app = express();

// use static files
app.use(express.static('./public'));

// Express body parser
app.use(express.urlencoded({ extended: true }));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));

// Connect flash 
app.use(flash());

// Global Vars for flash
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// Initialize Express middleware
app.use(express.json({extended: false}));
app.use(Routes);

const port = process.env.PORT || 9001

// Listen to connections
app.listen(port, () => console.log(`Server up and running on port ${port}`));
