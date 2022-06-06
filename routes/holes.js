const app = require('express').Router();
var db = require('../database/db-connector');

exports.router = app;

/* new routes for players entity */
app.get('/', function(req, res)
    {  
        refresh(req, res);
    });     

app.delete('/delete_hole/', function(req,res,next){
    let data = req.body;
    let club_id = parseInt(data.id);
    let hole_number = parseInt(data.hole_number);
    let query = `DELETE FROM holes WHERE club_id = ${club_id} AND hole_number = ${hole_number}`;
      
      
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

app.put('/update_hole', function(req,res,next){
    let data = req.body;
    let club_id = parseInt(data.club_id);
    let hole_number = parseInt(data.hole_number);
    let par_score = parseInt(data.par_score);
    
    query1 = `UPDATE holes SET hole_number=${hole_number}, club_id=${club_id}, par_score=${par_score}, description='${data.desc}' WHERE club_id=${club_id} AND hole_number=${hole_number};`
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
            query2 = `SELECT * FROM holes;`;
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

app.post('/add_hole', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let club_id = parseInt(data.club_id);
    let hole_number = parseInt(data.hole_number);
    let par_score = parseInt(data.par_score);

    // Create the query and run it on the database
    query1 = `INSERT INTO holes(club_id, hole_number, par_score, description) VALUES (${club_id}, ${hole_number}, ${par_score}, '${data.description}');`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM holes;`;
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

function refresh(req, res)
{
    let query1;
    if(!req.query.club_name && !req.query.hole_number && !req.query.par_score){
        //Default Join Query for club names
        query1 = `SELECT clubs.name, holes.club_id, holes.hole_number, holes.par_score, holes.description from holes INNER JOIN clubs on clubs.club_id = holes.club_id;`; 
    }
    else{
        query1 = `SELECT clubs.name, holes.club_id, holes.hole_number, holes.par_score, holes.description from holes INNER JOIN clubs on clubs.club_id = holes.club_id WHERE TRUE`; 
        if(req.query.club_name){
            query1 = query1 + ` AND name LIKE '%${req.query.club_name}%'`
        }
        if(req.query.hole_number){
            query1 = query1 + ` AND hole_number = ${req.query.hole_number}`
        }
        if(req.query.par_score){
            query1 = query1 + ` AND par_score = ${req.query.par_score}`
        }
        query1 = query1 + ';'
    }
    //console.log(req.query);

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
            let query2 = "SELECT club_id, name FROM clubs;";
            db.pool.query(query2, (error, names, fields) => {
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }

    
                return res.render('holes', {data: rows, names: names});
            })

        }
    })
}