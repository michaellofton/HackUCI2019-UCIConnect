var mysql = require('mysql');

var connection = mysql.createConnection({
    server: 'localhost',
    user: 'root',
    database: 'uciconnect',
    password: '',
    port: 1111
});

connection.connect(function(err){console.log("ERROR: " + err);});

// mysql.connect(connectionConfig, function(err){
//     console.log(err)
    // if(err){
    //     console.error('ERROR! Thread id: ' + connection.threadId);
    // }
    // else{
    //     console.log('Connected as thread id: ' + connection.threadId);
    // }

// });

module.exports = connection;