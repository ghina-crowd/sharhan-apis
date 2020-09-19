var express = require('express');
const { validationResult } = require('express-validator/check');
var statics = require('../constant/static.js');
var codes = require('../constant/code.js');
var authenticationService = require('../service/authentication.js');
var languageService = require('../validator/language');
const jwt = require('jsonwebtoken');
var config = require('../constant/config.js');
var i18n = require("i18n");
var router = express.Router();
//login
router.post('/login', function (req, res) {

    var lang = req.headers.language;
    var errors = validationResult(req);
    if (errors.array().length == 0) {
        var credentials = req.body;

        if (!credentials.email || credentials.email == '') {
            res.json({
                status: statics.STATUS_FAILURE,
                code: codes.FAILURE,
                message: i18n.__('EMPTY_FIELD_EMAIL'),
                data: null
            });
        } else if (!credentials.password || credentials.password == '') {
            res.json({
                status: statics.STATUS_FAILURE,
                code: codes.FAILURE,
                message: i18n.__('EMPTY_FIELD_PASS'),
                data: null
            });
        } else {
            return new Promise(function (resolve, reject) {
                authenticationService.login(credentials.email, credentials.password).then(user => {
                    resolve(user);
                    if (user == null) {
                        res.json({
                            status: statics.STATUS_FAILURE,
                            code: codes.FAILURE,
                            message: i18n.__('INCORRECT_PASSWORD_USER'),
                            data: user
                        });
                    } else {

                        var userData = {};
                        userData = {
                            id: user.user_id,
                            email: user.email,
                            user_type: user.user_type,
                        };

                        console.log(userData);
                        var token = jwt.sign(userData, config.secret, {});
                        user['token'] = token;
                        res.json({
                            status: statics.STATUS_SUCCESS,
                            code: codes.SUCCESS,
                            message: i18n.__('DATA_FOUND'),
                            data: user,
                        });
                    }


                }, error => {
                    reject(error);
                });
            });

        }
    } else {
        languageService.get_lang(lang, 'INVALID_DATA').then(msg => {
            res.json({
                status: statics.STATUS_FAILURE,
                code: codes.INVALID_DATA,
                message: msg.message,
                data: errors.array()
            });
        });
    }
});




module.exports = router;