var express = require('express'),
    _ = require('lodash'),
    router = express.Router(),
    jwtHelper = require('../../helpers/jwt'),
    utitlity = require('../../helpers/utility'),
    userModel = require('../../models/user'),
    util = require('util'),
    passwordHash = require('password-hash');

// var users = [{
//     id: 1,
//     username: 'test',
//     password: 'test'
// }, {
//     id: 2,
//     username: 'test2',
//     password: 'test2'
// }];
// var user = _.find(users, {
//     username: username
// });

// -----------------------------------------------------------------------
/**
 * @apiDefine UserModel
 * @apiSuccess {Number} id User indentity.
 * @apiSuccess {String} username Username.
 * @apiSuccess {String} password Password.
 * @apiSuccess {String} email Email.
 * @apiSuccess {Number} is_active User status.
 * @apiSuccess {Datetime} created_at Created at.
 * @apiSuccess {Datetime} updated_at Updated at.
 */

/**
 * @api {get} /api/v1/user Get User list
 * @apiName GetUserList
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiPermission Member
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Content-Type": "application/json",
 *       "Authorization": "Bearer TokenString"
 *     }
 *
 * @apiUse UserModel
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [{
 *       "id": 1,
 *       "username": "test",
 *       "password": "test",
 *       "email": "tuanquynh0508@gmail.com",
 *       "is_active": 1,
 *       "created_at": "2016-11-30T02:29:47.000Z",
 *       "updated_at": "2016-11-30T02:29:47.000Z"
 *     }]
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "code": 401,
 *       "message": "Failed to authenticate token."
 *     }
 */
router.get('/', function(req, res) {
    userModel.list().then(function(rows) {
        res.status(200).send(rows);
    }, function(err) {
        res.status(500).send(err);
    });
});

/**
 * @api {post} /api/v1/user Create User
 * @apiName CreateUser
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiPermission Member
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Content-Type": "application/json",
 *       "Authorization": "Bearer TokenString"
 *     }
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "username": "test",
 *       "password": "test",
 *       "email": "test@gmail.com",
 *       "is_active": true
 *     }
 *
 * @apiUse UserModel
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "id": 1,
 *       "username": "test",
 *       "password": "test",
 *       "email": "tuanquynh0508@gmail.com",
 *       "is_active": 1,
 *       "created_at": "2016-11-30T02:29:47.000Z",
 *       "updated_at": "2016-11-30T02:29:47.000Z"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "code": 400,
 *       "message": "Input Invalid"
 *     }
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "code": 401,
 *       "message": "Failed to authenticate token."
 *     }
 */
router.post('/', function(req, res) {
    // Validator input
    req.checkBody('username', 'Invalid username').notEmpty();
    req.checkBody('password', 'Invalid password').notEmpty();
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('is_active', 'Invalid is_active').notEmpty().isBoolean();

    let user = {
        username: req.body.username,
        password: passwordHash.generate(req.body.password),
        email: req.body.email,
        is_active: req.body.is_active,
        created_at: utitlity.getNow()
    }

    req.getValidationResult().then(function(result) {
        if (!result.isEmpty()) {
            return res.status(400).send({
                code: 400,
                message: util.inspect(result.array())
            });
        }

        userModel.create(user).then(function(rows) {
            res.status(201).send(rows);
        }, function(err) {
            res.status(500).send(err);
        });
    });
});

/**
 * @api {get} /api/v1/user/:id Get User Detail
 * @apiName GetUserDetail
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiPermission Member
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Content-Type": "application/json",
 *       "Authorization": "Bearer TokenString"
 *     }
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiUse UserModel
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 1,
 *       "username": "test",
 *       "password": "test",
 *       "email": "tuanquynh0508@gmail.com",
 *       "is_active": 1,
 *       "created_at": "2016-11-30T02:29:47.000Z",
 *       "updated_at": "2016-11-30T02:29:47.000Z"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "code": 401,
 *       "message": "Failed to authenticate token."
 *     }
 *     HTTP/1.1 404 Not Found
 *     {
 *       "code": 404,
 *       "message": "Record is not found."
 *     }
 */
router.get('/:id', function(req, res) {

    let id = parseInt(req.params.id, 10);

    userModel.findById(id).then(function(rows) {
        if (rows.length === 0) {
            return res.status(400).send({
                code: 400,
                message: 'Record is not found.'
            });
        }

        res.status(200).send(rows[0]);
    }, function(err) {
        res.status(500).send(err);
    });
});

/**
 * @api {put} /api/v1/user/:id Update User
 * @apiName UpdateUser
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiPermission Member
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Content-Type": "application/json",
 *       "Authorization": "Bearer TokenString"
 *     }
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "username": "test",
 *       "password": "test",
 *       "email": "test@gmail.com",
 *       "is_active": true
 *     }
 *
 * @apiUse UserModel
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 1,
 *       "username": "test",
 *       "password": "test",
 *       "email": "tuanquynh0508@gmail.com",
 *       "is_active": 1,
 *       "created_at": "2016-11-30T02:29:47.000Z",
 *       "updated_at": "2016-11-30T02:29:47.000Z"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "code": 400,
 *       "message": "Input Invalid"
 *     }
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "code": 401,
 *       "message": "Failed to authenticate token."
 *     }
 *     HTTP/1.1 404 Not Found
 *     {
 *       "code": 404,
 *       "message": "Record is not found."
 *     }
 */
router.put('/:id', function(req, res) {

    // Validator input
    req.checkBody('username', 'Invalid username').notEmpty();
    //req.checkBody('password', 'Invalid password').notEmpty();
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('is_active', 'Invalid is_active').notEmpty().isBoolean();

    let user = {
        id: parseInt(req.params.id, 10),
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        is_active: req.body.is_active,
        updated_at: utitlity.getNow()
    }

    req.getValidationResult().then(function(result) {
        if (!result.isEmpty()) {
            return res.status(400).send({
                code: 400,
                message: util.inspect(result.array())
            });
        }

        userModel.update(user).then(function(rows) {
            res.status(200).send(rows);
        }, function(err) {
            res.status(err.code).send(err);
        });
    });
});

/**
 * @api {delete} /api/v1/user/:id Delete User
 * @apiName DeleteUser
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiPermission Member
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Content-Type": "application/json",
 *       "Authorization": "Bearer TokenString"
 *     }
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 200,
 *       "message": "Number of record deleted."
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "code": 401,
 *       "message": "Failed to authenticate token."
 *     }
 *     HTTP/1.1 404 Not Found
 *     {
 *       "code": 404,
 *       "message": "Record is not found."
 *     }
 */
router.delete('/:id', function(req, res) {
    let id = parseInt(req.params.id, 10);
    userModel.delete(id).then(function(rows) {
        res.status(200).send({
            code: 200,
            message: 'Deleted ' + rows.affectedRows + ' records.'
        });
    }, function(err) {
        res.status(err.code).send(err);
    });
});

/**
 * @api {put} /api/v1/user/:id/password Update User password
 * @apiName UpdateUserPassword
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiPermission Member
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Content-Type": "application/json",
 *       "Authorization": "Bearer TokenString"
 *     }
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "old_password": "test",
 *       "new_password": "test"
 *     }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 200,
 *       "message": "Update password success."
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "code": 400,
 *       "message": "Input Invalid"
 *     }
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "code": 401,
 *       "message": "Failed to authenticate token."
 *     }
 *     HTTP/1.1 404 Not Found
 *     {
 *       "code": 404,
 *       "message": "Record is not found."
 *     }
 */
router.put('/:id/password', function(req, res) {

    // Validator input
    req.checkBody('old_password', 'Invalid old_password').notEmpty();
    req.checkBody('new_password', 'Invalid new_password').notEmpty();

    let id = parseInt(req.params.id, 10);
    let oldPassword = req.body.old_password;
    let newPassword = passwordHash.generate(req.body.new_password);

    req.getValidationResult().then(function(result) {
        if (!result.isEmpty()) {
            return res.status(400).send({
                code: 400,
                message: util.inspect(result.array())
            });
        }

        userModel.changePassword(id, oldPassword, newPassword).then(function(rows) {
            res.status(200).send({
                code: 200,
                message: 'Update password success.'
            });
        }, function(err) {
            res.status(err.code).send(err);
        });
    });
});
// -----------------------------------------------------------------------

module.exports = router;
