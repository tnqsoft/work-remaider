var express = require('express'),
    _ = require('lodash'),
    router = express.Router(),
    jwtHelper = require('../../helpers/jwt'),
    userModel = require('../../models/user'),
    util = require('util'),
    passwordHash = require('password-hash');

// -----------------------------------------------------------------------
/**
 * @api {post} /api/v1/authenticate User login
 * @apiName UserLogin
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiPermission Anonymous
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Content-Type": "application/json"
 *     }
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "username": "test",
 *       "password": "test"
 *     }
 *
 * @apiSuccess {String} token Token key.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "token": "Token key string"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "code": 400,
 *       "message": "Input invalid"
 *     }
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "code": 401,
 *       "message": "The username or password don't match."
 *     }
 *     HTTP/1.1 404 Not Found
 *     {
 *       "code": 404,
 *       "message": "User not found."
 *     }
 */
router.post('/authenticate', function(req, res, next) {
    // Validator input
    req.checkBody('username', 'Invalid username').notEmpty();
    req.checkBody('password', 'Invalid password').notEmpty();

    let username = req.body.username;
    let password = req.body.password;
    let remember = req.body.remember;

    req.getValidationResult().then(function(result) {
        if (!result.isEmpty()) {
            return res.status(400).send({
                code: 400,
                message: util.inspect(result.array())
            });
        }

        userModel.findByUsername(username).then(function(rows) {
          if(rows.length === 0) {
            return res.status(404).send({
                code: 404,
                message: "User not found."
            });
          }

          var user = rows[0];

          if (passwordHash.verify(password, user.password) === false) {
              return res.status(401).send({
                  code: 401,
                  message: "The username or password don't match."
              });
          }

          res.status(200).send({
              token: jwtHelper.create(user, remember)
          });
        });
    });
});
// -----------------------------------------------------------------------

module.exports = router;
