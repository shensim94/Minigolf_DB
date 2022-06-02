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
            res.render('hole_scores', {data: rows});
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