const app = require('express').Router();
var db = require('../database/db-connector');

exports.router = app;

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
            //204-> no content code
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
    if(!person || !originID || !newID)
    {
        res.sendStatus(400);
    }

    //update where
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

function refresh(req, res)
{
    //join query for club_members
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
            //to populate clubs variable
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
                    //to populate current members 
                    let query3 = "SELECT club_members.player_id AS 'Player_ID', players.name AS 'Name', club_members.club_id FROM club_members INNER JOIN players on players.player_id = club_members.player_id GROUP BY Name;";
                    db.pool.query(query3, function(error, names, fields){
                        if (error) {

                            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                            console.log(error);
                            res.sendStatus(400);
                        }
                        else
                        {
                            //to get a list of all players
                            let query4 = "SELECT player_id, name FROM players;";
                            db.pool.query(query4, function(error, players, fields){
                                if(error)
                                {
                                    console.log(error);
                                    res.sendStatus(400);
                                }
                                else
                                {
                                    res.render('club_member', { data: rows, clubs: clubs, names:names, players: players });
                                }
                            })

                        }
                    })
                }
            })
        }
    })
}