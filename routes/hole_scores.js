const app = require('express').Router();
var db = require('../database/db-connector');

exports.router = app;

app.get('/', function(req,res)
{
    let query = `SELECT hole_scores.hole_scores_id,
    hole_scores.date,
    hole_scores.player_id,
    players.name AS 'player_name',
    hole_scores.club_id,
    clubs.name AS 'club_name',
    hole_scores.hole_number,
    hole_scores.score FROM hole_scores
    INNER JOIN players on players.player_id = hole_scores.player_id
    INNER JOIN clubs on clubs.club_id = hole_scores.club_id;`
    db.pool.query(query, function(error, rows, fields)
    {
        if(error) 
        {
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            //to get a list of all players
            let query2 = "SELECT player_id, name FROM players;";
            db.pool.query(query2, function (error, players, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    let query3 = "SELECT club_id, name FROM clubs"
                    db.pool.query(query3, function(error, clubs, fields){
        
                        // If there was an error on the second query, send a 400
                        if (error) {
        
                            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                            console.log(error);
                            res.sendStatus(400);
                        }
                        else
                        {
                            res.render('hole_scores', { data: rows, players: players, clubs:clubs });
                        }
                    })
                }
            })
        }
    })  
})

app.delete('/deleteholescore', function(req, res)
{
    let data = req.body;
    let hole_scores_id = parseInt(data.id);
    let query = `DELETE FROM hole_scores WHERE hole_scores_id = ${hole_scores_id}`
    db.pool.query(query, function(error, fields){
        if(error)
        {
            console.log(error);
            res.sendStatus(400);
        } else
        {
            res.sendStatus(204);
        }
    })
})

app.post('/addholescore', function(req,res)
{
    let data = req.body;
    let date = data.date;
    let player_id = parseInt(data.player_id);
    let club_id = parseInt(data.club_id);
    let hole_number = parseInt(data.hole_number);
    let score = parseInt(data.score);
    if(!date || !player_id || !club_id || !hole_number || !score)
    {
        res.sendStatus(400);
        return;
    }

    //maybe check that hole exists first?

    //insert query
    let query = `INSERT INTO hole_scores (date, player_id, club_id, hole_number, score)
    VALUES (
        "${date}",
        ${player_id},
        ${club_id},
        ${hole_number},
        ${score}
    )`;
    db.pool.query(query, function(error, rows, fields)
    {
        if(error){
            console.log(error)
            res.sendStatus(400)
        }
        else
        {
            res.send(rows);
        }
    })
})

// app.put('/updateholescore', function(req,res)
// {
//     let data = req.body;
//     let hole_scores_id = parseInt(data.id);
//     let 
//     let query = `UPDATE hole_scores SET `
// })