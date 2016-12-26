var express = require('express'),
    _ = require('lodash'),
    configs = require('../configs'),
    jwt = require('jsonwebtoken'),
    ip = require('ip');

var jwtHelper = {
    create: function(user, remember) {
        let expiresTime = 60 * 24; // 1 day
        if (remember === true) {
            expiresTime = expiresTime * 30; // 1 month
        }

        let buildTokenData = {
          id: user.id,
          username: user.username,
          ip: ip.address()
        }

        return jwt.sign(_.omit(buildTokenData, 'password'), configs.secret, {
            expiresInMinutes: expiresTime
        });
    }
};

module.exports = jwtHelper;
