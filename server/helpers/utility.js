var express = require('express'),
    _ = require('lodash'),
    configs = require('../configs'),
    moment = require('moment');

var utility = {
    getNow: function() {
        moment().utcOffset(configs.timezone);
        return moment().format();
    }
};

module.exports = utility;
