module.exports = function(app){
   
    var note = require('./api/notes')();
    app.use('/api/note',note);
   
}