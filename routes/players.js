const app = require('express').Router();
var db = require('../database/db-connector');

exports.router = app;

/* new routes for players entity */
app.get('/', function(req, res)
    {  
        let query1 = "SELECT * FROM players;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('players', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query

app.post('/add_player', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let zip = parseInt(data.zip);
    if (isNaN(zip))
    {
        zip = 'NULL'
    }


    // Create the query and run it on the database
    query1 = `INSERT INTO players(name, address, zip_code, city, state) VALUES ('${data.name}', '${data.address}', ${zip}, '${data.city}', '${data.state}');`;
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
            query2 = `SELECT * FROM players;`;
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
})

app.delete('/delete_player/', function(req,res,next){
    let data = req.body;
    let playerID = parseInt(data.id);
    let query = `DELETE FROM players WHERE player_id = ${playerID}`;
  
  
    db.pool.query(query, function (error, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        } else 
        {
            //204-> no content code
            res.sendStatus(204);
        }
    })
});

app.put('/update_player', function(req,res,next){
    let data = req.body;
    let id = parseInt(data.id);
    let zip = parseInt(data.zip);
    if (isNaN(zip))
    {
        zip = 'NULL'
    }
    query1 = `UPDATE players SET name='${data.name}', address='${data.address}', zip_code=${zip}, city='${data.city}', state='${data.state}' WHERE player_id = ${id}`
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
            query2 = `SELECT * FROM players;`;
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
})