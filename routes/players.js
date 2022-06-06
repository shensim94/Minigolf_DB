const app = require('express').Router();
var db = require('../database/db-connector');

exports.router = app;

/* new routes for players entity */
app.get('/', function(req, res)
    {  
        let query1;
        if(!req.query.name && !req.query.address && !req.query.zip && !req.query.city && !req.query.state){
            query1 = `SELECT players.player_id, players.name, players.favorite_club, clubs.name AS 'favorite_club_name', players.address, players.zip_code, players.city, players.state FROM players
            LEFT JOIN clubs on clubs.club_id = players.favorite_club
            ORDER BY player_id ASC;`; 
        }
        else{
            query1 = `SELECT players.player_id, players.name, players.favorite_club, clubs.name AS 'favorite_club_name', players.address, players.zip_code, players.city, players.state FROM players
            LEFT JOIN clubs on clubs.club_id = players.favorite_club WHERE TRUE`; 
            if(req.query.name){
                query1 = query1 + ` AND players.name LIKE '%${req.query.name}%'`
            }
            if(req.query.address){
                query1 = query1 + ` AND players.address LIKE '%${req.query.address}%'`
            }
            if(req.query.zip){
                query1 = query1 + ` AND players.zip_code = ${req.query.zip}`
            }
            if(req.query.city){
                query1 = query1 + ` AND players.city LIKE '%${req.query.city}%'`
            }
            if(req.query.state){
                query1 = query1 + ` AND players.state LIKE '%${req.query.state}%'`
            }
            query1 = query1 + ';'
        }
        console.log(query1);

        let query2 = "SELECT club_id, name FROM clubs"
        db.pool.query(query2, function(error, clubs, fields){

            // If there was an error on the second query, send a 400
            if (error) {

                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
            } else
            {
                db.pool.query(query1, function(error, rows, fields){    // Execute the query
                    res.render('players', {data: rows, clubs: clubs});                  // Render the index.hbs file, and also send the renderer
                })
            }
        })

    });

app.post('/add_player', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let zip = parseInt(data.zip);
    if (isNaN(zip))
    {
        zip = 'NULL'
    }
    if(!parseInt(data.fclub))
    {
        data.fclub = 'NULL'
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO players(name, favorite_club, address, zip_code, city, state) VALUES ('${data.name}', ${data.fclub}, '${data.address}', ${zip}, '${data.city}', '${data.state}');`;
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
            query2 = `SELECT players.player_id, players.name, players.favorite_club, clubs.name AS 'favorite_club_name', players.address, players.zip_code, players.city, players.state FROM players
            LEFT JOIN clubs on clubs.club_id = players.favorite_club
            ORDER BY player_id ASC;`;
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
    if(!parseInt(data.fclub))
    {
        data.fclub = 'NULL'
    }

    query1 = `UPDATE players SET name='${data.name}', favorite_club=${data.fclub}, address='${data.address}', zip_code=${zip}, city='${data.city}', state='${data.state}' WHERE player_id = ${id}`
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, just requery players table.
            query2 = `SELECT players.player_id, players.name, players.favorite_club, clubs.name AS 'favorite_club_name', players.address, players.zip_code, players.city, players.state FROM players
            LEFT JOIN clubs on clubs.club_id = players.favorite_club
            ORDER BY player_id ASC;`;
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