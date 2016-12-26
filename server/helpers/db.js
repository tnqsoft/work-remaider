var mysql = require('mysql');
var configs = require('../configs');

var connection = mysql.createConnection({
    host: configs.database.host,
    user: configs.database.user,
    password: configs.database.password,
    database: configs.database.database,
    multipleStatements: configs.database.multipleStatements,
});

connection.connect();

connection.config.queryFormat = function(query, values) {
    if (!values) return query;
    return query.replace(/\:(\w+)/g, function(txt, key) {
        if (values.hasOwnProperty(key)) {
            return this.escape(values[key]);
        }
        return txt;
    }.bind(this));
};

process.on('exit', function() {
    connection.end();
});

module.exports = connection;
