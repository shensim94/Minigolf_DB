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

// Database
var db = require('./database/db-connector')

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({ extname: ".hbs" }));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

/*
    ROUTES
*/
app.post('/addmembership', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    let Player_ID = parseInt(data.Player_ID)
    let Club_ID = parseInt(data.Club_ID)

    // Create the query and run it on the database
    let query1 = `INSERT INTO club_members (player_id, club_id) VALUES ('${Player_ID}', '${Club_ID}')`;
    db.pool.query(query1, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            let query2 = "SELECT club_members.player_id AS 'Player_ID', players.name AS 'Name', club_members.club_id AS 'Club_ID', clubs.name AS 'Club_Name' FROM club_members INNER JOIN players on players.player_id = club_members.player_id INNER JOIN clubs on clubs.club_id = club_members.club_id";
            query2 = query2 + ` WHERE club_members.player_id = ${Player_ID} AND club_members.club_id = ${Club_ID};`
            //let query1 = "SELECT * from club_members;"
            db.pool.query(query2, function(error, rows, fields){
                // If there was an error on the second query, send a 400
                if (error) {
        
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                else
                {
                    res.send(rows)
                }
            })
        }
    })
});

app.delete('/delete-club-member', function (req, res, next) {
    let data = req.body;
    let playerID = parseInt(data.id);
    let clubID = parseInt(data.cid);
    let deleteQuery = `DELETE from club_members WHERE player_id = ${playerID} AND club_id= ${clubID}`;
    // Run the 1st query
    db.pool.query(deleteQuery, function (error, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        } else 
        {
            res.sendStatus(204);
        }
    })
});

app.put('/update-club-member', function(req,res,next)
{
    let data = req.body;
    let person = parseInt(data.name);
    let originID = parseInt(data.originID);
    let newID = parseInt(data.newID);

    let query = `UPDATE club_members SET club_id = ${newID} WHERE club_id = ${originID} AND player_id = ${person};`
    db.pool.query(query, function(error, fields){
        if(error)
        {
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            res.sendStatus(200);
        }
    })
});

app.get('/', function (req, res) {
    refresh(req, res);    
});                                                         

/*
    LISTENER
*/
app.listen(PORT, function () {            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});

function refresh(req, res)
{
    let query1 = "SELECT club_members.player_id AS 'Player_ID', players.name AS 'Name', club_members.club_id AS 'Club_ID', clubs.name AS 'Club_Name' FROM club_members INNER JOIN players on players.player_id = club_members.player_id INNER JOIN clubs on clubs.club_id = club_members.club_id;";
    db.pool.query(query1, function(error, rows, fields){
        // If there was an error on the second query, send a 400
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            let query2 = "SELECT club_id, name FROM clubs"
            db.pool.query(query2, function(error, clubs, fields){

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                else
                {
                    let query3 = "SELECT club_members.player_id AS 'Player_ID', players.name AS 'Name', club_members.club_id FROM club_members INNER JOIN players on players.player_id = club_members.player_id GROUP BY Name;";
                    db.pool.query(query3, function(error, names, fields){
                        if (error) {

                            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                            console.log(error);
                            res.sendStatus(400);
                        }
                        else
                        {
                            res.render('index', { data: rows, clubs: clubs, names:names });
                        }
                    })
                }
            })
        }
    })
}