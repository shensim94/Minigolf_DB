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

})

router.delete('/deleteclub', function(req, res)
{

})

router.get('/', function(req,res)
{
    let query = `SELECT * FROM clubs ORDER BY club_id ASC;`
    db.pool.query(query, function(error, rows, fields)
    {
        if(error)
        {
            console.log(error)
            res.sendStatus()
        }
        else
        {
            res.render('clubs', {data: rows});
        }
    })
})