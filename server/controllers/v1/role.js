var express = require('express'),
    _ = require('lodash'),
    router = express.Router(),
    utitlity = require('../../helpers/utility'),
    roleModel = require('../../models/role'),
    util = require('util');

// -----------------------------------------------------------------------
/**
 * @apiDefine RoleModel
 * @apiSuccess {Number} id Role indentity.
 * @apiSuccess {String} name Name.
 * @apiSuccess {Datetime} created_at Created at.
 * @apiSuccess {Datetime} updated_at Updated at.
 */

/**
 * @api {get} /api/v1/role Get Role list
 * @apiName GetRoleList
 * @apiGroup Role
 * @apiVersion 1.0.0
 * @apiPermission Member
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Content-Type": "application/json",
 *       "Authorization": "Bearer TokenString"
 *     }
 *
 * @apiUse RoleModel
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [{
 *       "id": 1,
 *       "name": "test",
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
    roleModel.list().then(function(rows) {
        res.status(200).send(rows);
    }, function(err) {
        res.status(500).send(err);
    });
});

/**
 * @api {post} /api/v1/role Create Role
 * @apiName CreateRole
 * @apiGroup Role
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
 *       "name": "test"
 *     }
 *
 * @apiUse RoleModel
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "id": 1,
 *       "name": "test",
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
    req.checkBody('name', 'Invalid username').notEmpty();

    let record = {
        name: req.body.name,
        created_at: utitlity.getNow()
    }

    req.getValidationResult().then(function(result) {
        if (!result.isEmpty()) {
            return res.status(400).send({
                code: 400,
                message: util.inspect(result.array())
            });
        }

        roleModel.create(record).then(function(rows) {
            res.status(201).send(rows);
        }, function(err) {
            res.status(500).send(err);
        });
    });
});

/**
 * @api {get} /api/v1/role/:id Get Role Detail
 * @apiName GetRoleDetail
 * @apiGroup Role
 * @apiVersion 1.0.0
 * @apiPermission Member
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Content-Type": "application/json",
 *       "Authorization": "Bearer TokenString"
 *     }
 *
 * @apiParam {Number} id Role unique ID.
 *
 * @apiUse RoleModel
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 1,
 *       "name": "test",
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

    roleModel.findById(id).then(function(rows) {
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
 * @api {put} /api/v1/role/:id Update Role
 * @apiName UpdateRole
 * @apiGroup Role
 * @apiVersion 1.0.0
 * @apiPermission Member
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Content-Type": "application/json",
 *       "Authorization": "Bearer TokenString"
 *     }
 *
 * @apiParam {Number} id Role unique ID.
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "name": "test"
 *     }
 *
 * @apiUse RoleModel
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 1,
 *       "name": "test",
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
    req.checkBody('name', 'Invalid username').notEmpty();

    let record = {
        id: parseInt(req.params.id, 10),
        name: req.body.name,
        updated_at: utitlity.getNow()
    }

    req.getValidationResult().then(function(result) {
        if (!result.isEmpty()) {
            return res.status(400).send({
                code: 400,
                message: util.inspect(result.array())
            });
        }

        roleModel.update(record).then(function(rows) {
            res.status(200).send(rows);
        }, function(err) {
            res.status(err.code).send(err);
        });
    });
});

/**
 * @api {delete} /api/v1/role/:id Delete Role
 * @apiName DeleteRole
 * @apiGroup Role
 * @apiVersion 1.0.0
 * @apiPermission Member
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Content-Type": "application/json",
 *       "Authorization": "Bearer TokenString"
 *     }
 *
 * @apiParam {Number} id Role unique ID.
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
    roleModel.delete(id).then(function(rows) {
        res.status(200).send({
            code: 200,
            message: 'Deleted ' + rows.affectedRows + ' records.'
        });
    }, function(err) {
        res.status(err.code).send(err);
    });
});
// -----------------------------------------------------------------------

module.exports = router;
