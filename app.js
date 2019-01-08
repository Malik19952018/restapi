const express = require ("express");
const app = express ();

const gamesRoutes = require ("./api/routes/games");

var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    database : 'gamesdb',
    user     : 'root',
    password : '1234',
});


app.use ( "/games", gamesRoutes);

app.use ((req, res, next)=> {
    const error = new Error ("not found");
    error.status= 404;
    next(error);


})

app.use ((error, req, res , next)=> {
    res.status(error.status || 500);
    res.json ({
        error:{
            message: error.message

        }
    });

});




module.exports= app;
