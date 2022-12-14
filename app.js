//Authors: Allan Hillyer and Simon Shen
// Citation for the following file:
// Date: 05/19/2022
// Adapted from: https://github.com/osu-cs340-ecampus/nodejs-starter-app
/*
    SETUP
*/
// Express
var express = require('express');   // We are using the express library for the web server
var app = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public')); // this is needed to allow for the form to use the ccs style sheet

PORT = 9233;                 // Set a port number at the top so it's easy to change in the future

const routes = require('./routes');

// Database
var db = require('./database/db-connector')

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({ extname: ".hbs" }));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

//Citation for following function
//Date: 6/2/2022
//Copied from Group 105 (Christopher Tu and Mario Lopez) in their app.js
//https://edstem.org/us/courses/21099/discussion/1547315
const hbs = exphbs.create({
    extname: ".hbs",
    helpers: {
        formatDate: function (date) {
            let dateObj = new Date(date)
            let month = dateObj.getMonth();
            month += 1; //because Jan = 0
            if (month < 10) month = '0' + month;
            let day = dateObj.getDate();
            if (day < 10) day = '0' + day;
            let year = dateObj.getFullYear();
            let newDate = month + '-' + day + '-' + year;
            return newDate;
        }
    }
});
app.engine('.hbs', hbs.engine);
//end of paste

app.use('/', routes);

app.get('/', function(req,res)
{
    res.render('index');
})

/*
    LISTENER
*/
app.listen(PORT, function () {            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
