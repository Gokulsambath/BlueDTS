/* *****************************************************************************************************************
    Name        : DTS
    Description : Entry Point to the DTS app
    Author      : Adarsh Dubey
    Created On  : 02/02/2022
    Modified By : NA
    Modified On : NA
    Reason      : NA
***************************************************************************************************************** */

var app = require('./../BlueDTS/config/startServer');
var createError = require('http-errors');

app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

console.log('DTS starts from here...'); 
module.exports = app;



