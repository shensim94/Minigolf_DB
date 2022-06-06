const router = require('express').Router();
var db = require('../database/db-connector');

exports.router = router;

//add a club
router.post('/addclub', function(req, res)
{
    let data = req.body;
    if(!data.name || !data.address || !data.zip_code || !data.city || !data.state)
    {
        res.sendStatus(400);
        return;
    }
    let name = `"` + data.name.toString() + `"`;
    let description = data.description
    if(data.description)
    {
        description = `"` + data.description.toString() + `"`;
    }else
    {
        description = null;
    }

    let address = `"` + data.address.toString()+ `"`;
    let zip_code = parseInt(data.zip_code);
    let city = `"` + data.city.toString() + `"`;
    let state = `"` + data.state.toString() + `"`;

    let query1 = `INSERT INTO clubs (name, description, address, zip_code, city, state)`;
    query1 = query1 + `VALUES(${name}, ${description}, ${address}, ${zip_code}, ${city}, ${state});`;
    
    db.pool.query(query1, function(error, rows, fields)
    {
        if(error)
        {
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            let query2 = `SELECT * FROM clubs ORDER BY club_id ASC;`
            db.pool.query(query2, function(error, rows, fields)
            {
                if(error)
                {
                    console.log(error)
                    res.sendStatus(400);
                }
                else
                {
                    res.send(rows);
                }
            })
        }
    })
})

router.put('/updateclub', function(req,res)
{
    
    let data = req.body;
    if(!data.id || !data.name || !data.address || !data.zip || !data.state || !data.city)
    {
        res.sendStatus(400);
        return;
    }
    let id = parseInt(data.id);
    let name = `"` + data.name + `"`;
    let desc = `"` + data.description + `"`;
    let city = `"` + data.city + `"`;
    let address = `"` + data.address + `"`;
    let zip = parseInt(data.zip);
    let state = `"` + data.state + `"`;

    //update where
    let query = `UPDATE clubs
    SET
    name = ${name},
    description = ${desc},
    address = ${address},
    zip_code = ${zip},
    city = ${city},
    state = ${state}
    WHERE club_id = ${id}`;

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
})

router.delete('/deleteclub', function(req, res)
{
    let data = req.body;
    let clubID = parseInt(data.id);
    let deleteQuery = `DELETE FROM clubs WHERE club_id = ${clubID}`;
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
})

router.get('/', function(req,res)
{
    //default query
    let query = null;
    //items from search form
    let searchItems = req.query;

    //if statements to handle searches
    if(!searchItems.club_name && !searchItems.address && !searchItems.zip && !searchItems.city && !searchItems.state)
    {
        query = `SELECT * FROM clubs ORDER BY club_id ASC;`;
    }
    else{
        query = `SELECT * FROM clubs WHERE TRUE`

        if (searchItems.club_name)
            query = query + ` AND name LIKE '%${searchItems.club_name}%'`;
        if (searchItems.address)
            query = query + ` AND address LIKE '%${searchItems.address}%'`;
        if (searchItems.zip)
            query = query + ` AND zip_code = ${searchItems.zip_code}`;
        if (searchItems.city)
            query = query + ` AND city LIKE '%${searchItems.city}%'`;
        if (searchItems.state)
            query = query + ` AND state LIKE '%${searchItems.state}%'`;
        
        query = query + `;`
    }


    db.pool.query(query, function(error, rows, fields)
    {
        if(error)
        {
            console.log(error)
            res.sendStatus(400)
        }
        else
        {
            res.render('clubs', {data: rows});
        }
    })
})