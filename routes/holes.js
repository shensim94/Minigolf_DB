const app = require('express').Router();
var db = require('../database/db-connector');

exports.router = app;

/* new routes for players entity */
app.get('/', function(req, res)
    {  
        let query1 = "SELECT clubs.name, holes.club_id, holes.hole_number, holes.par_score, holes.description from holes INNER JOIN clubs on clubs.club_id = holes.club_id;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('holes', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
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