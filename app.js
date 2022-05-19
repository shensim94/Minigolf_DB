/*
    SETUP
*/
// Express
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({extended: true}))
PORT        = 9233;                 // Set a port number at the top so it's easy to change in the future

// Database
var db = require('./database/db-connector')

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

/*
    ROUTES
*/
app.post('/addmembership', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let player_id = parseInt(data.player_id);
    if (isNaN(player_id))
    {
        res.send(400)
    }

    let club_id = parseInt(data.club_id);
    if (isNaN(club_id))
    {
        res.send(400)
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO club_members (player_id, club_id) VALUES ('${player_id}', '${club_id}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            let query2 = "SELECT club_members.player_id AS 'Player_ID', players.name AS 'Name', club_members.club_id AS 'Club_ID', clubs.name AS 'Club_Name' FROM club_members INNER JOIN players on players.player_id = club_members.player_id INNER JOIN clubs on clubs.club_id = club_members.club_id; ";               // Define our query
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

app.get('/', function(req, res)
    {  
        let query1 = "SELECT club_members.player_id AS 'Player_ID', players.name AS 'Name', club_members.club_id AS 'Club_ID', clubs.name AS 'Club_Name' FROM club_members INNER JOIN players on players.player_id = club_members.player_id INNER JOIN clubs on clubs.club_id = club_members.club_id; ";               // Define our query
        //let query1 = "SELECT * from club_members;"
        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('index', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});