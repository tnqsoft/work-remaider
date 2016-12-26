var condb = require('../helpers/db'),
    utitlity = require('../helpers/utility'),
    Promise = require('promise');

var roleModel = {
    tableName: 'tbl_role',
    list: function() {
        var _this = this;
        var sql = 'SELECT * FROM ' + _this.tableName;
        return new Promise(function(resolve, reject) {
            condb.query(sql,
                function(err, rows, fields) {
                    if (err) {
                        reject(err);
                    }
                    resolve(rows);
                });
        });
    },
    findById: function(id) {
        var _this = this;
        var sql = 'SELECT * FROM ' + this.tableName + ' WHERE id = :id LIMIT 0,1';
        return new Promise(function(resolve, reject) {
            condb.query(sql, {
                    id: id
                },
                function(err, rows, fields) {
                    if (err) {
                        reject(err);
                    }
                    resolve(rows);
                });
        });
    },
    create: function(record) {
        var _this = this;
        var sql = 'INSERT INTO ' + _this.tableName + ' SET name = :name, created_at = :created_at';
        return new Promise(function(resolve, reject) {
            var query = condb.query(sql, record,
                function(err, rows, fields) {
                    if (err) {
                        reject(err);
                    }
                    _this.findById(rows.insertId).then(function(rows) {
                        resolve(rows[0]);
                    }, function(err) {
                        reject(err);
                    });
                });
            //console.log(query.sql);
        });
    },
    update: function(record) {
        var _this = this;
        var sql = 'UPDATE ' + _this.tableName + ' SET name = :name, updated_at = :updated_at WHERE id = :id';
        return new Promise(function(resolve, reject) {
            _this.findById(record.id).then(function(rows) {
                if (rows.length === 0) {
                    reject({
                        code: 404,
                        message: 'Record is not found.'
                    });
                }
                var query = condb.query(sql, record,
                    function(err, rows, fields) {
                        if (err) {
                            reject(err);
                        }
                        _this.findById(record.id).then(function(rows) {
                            resolve(rows[0]);
                        }, function(err) {
                            reject(err);
                        });
                    });
                //console.log(query.sql);
            }, function(err) {
                reject(err);
            });
        });
    },
    delete: function(id) {
        var _this = this;
        var sql = 'DELETE FROM ' + _this.tableName + ' WHERE id = :id';
        return new Promise(function(resolve, reject) {
            _this.findById(id).then(function(rows) {
                if (rows.length === 0) {
                    reject({
                        code: 404,
                        message: 'Record is not found.'
                    });
                }
                var query = condb.query(sql, {
                        id: id
                    },
                    function(err, rows, fields) {
                        if (err) {
                            reject(err);
                        }

                        resolve(rows);
                    });
                //console.log(query.sql);
            }, function(err) {
                reject(err);
            });
        });
    }
};

module.exports = roleModel;
