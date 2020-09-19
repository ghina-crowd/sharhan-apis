var express = require('express');
const { validationResult } = require('express-validator/check');
var languageService = require('../validator/language');
var statics = require('../constant/static.js');
var codes = require('../constant/code.js');
var PartnerService = require('../service/Partner');

var router = express.Router();
router.get('/get', async function (req, res) {




    lang = req.headers.language;
    var errors = validationResult(req);
    if (errors.array().length == 0) {
        var lang = req.headers.language;
        return new Promise(function (resolve, reject) {
            PartnerService.getAll().then(Partners => {
                resolve(Partners);
                if (Partners == null) {
                    Partners = [];
                }
                languageService.get_lang(lang, 'SUCCESS').then(msg => {
                    res.json({
                        status: statics.STATUS_SUCCESS,
                        code: codes.SUCCESS,
                        message: msg.message,
                        data: Partners
                    });
                });
            }, error => {
                reject(error);
            });
        });
    } else {
        languageService.get_lang(lang, 'INVALID_DATA').then(msg => {
            res.json({
                status: statics.STATUS_FAILURE,
                code: codes.INVALID_DATA,
                message: msg.message,
                data: errors.array()
            });
        })
    }
});
router.post('/create', async function (req, res) {
    var lang = req.headers.language;
    var errors = validationResult(req);

    try {
        if (errors.array().length == 0) {
            var credentials = req.body;
            var lang = req.headers.language;

            return new Promise(function (resolve, reject) {

                if (!credentials.image || credentials.image == '') {
                    languageService.get_lang(lang, 'image').then(msg => {
                        res.json({
                            status: statics.STATUS_FAILURE,
                            code: codes.FAILURE,
                            message: msg.message,
                            data: null
                        });
                    });
                } else {
                    return new Promise(function (resolve, reject) {
                        PartnerService.create(credentials).then(account => {
                            resolve(account);
                            languageService.get_lang(lang, 'SUCCESS').then(msg => {
                                res.json({
                                    status: statics.STATUS_SUCCESS,
                                    code: codes.SUCCESS,
                                    message: msg.message,
                                    data: account
                                });
                            });
                        },
                            error => {
                                reject(error);
                            }
                        );

                    });
                }
            })
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
    } catch (ex) {
        console.log(ex);
    }
});
router.delete('/delete/:partner_id', async function (req, res) {
    var lang = req.headers.language;
    var errors = validationResult(req);
    if (errors.array().length == 0) {
        var lang = req.headers.language;
        return new Promise(function (resolve, reject) {
            {

                return new Promise(function (resolve, reject) {
                    PartnerService.Delete(req.params.partner_id).then(account => {
                        resolve(account);

                        if (account) {
                            languageService.get_lang(lang, 'SUCCESS').then(msg => {
                                res.json({
                                    status: statics.STATUS_SUCCESS,
                                    code: codes.SUCCESS,
                                    message: msg.message,
                                    data: account
                                });
                            });
                        } else {
                            languageService.get_lang(lang, 'partner_id').then(msg => {
                                res.json({
                                    status: statics.STATUS_FAILURE,
                                    code: codes.FAILURE,
                                    message: msg.message,
                                    data: null
                                });
                            });
                        }

                    }
                        ,
                        error => {
                            reject(error);
                        }
                    );
                });
            }
        })
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
router.put('/update', async function (req, res) {
    var lang = req.headers.language;
    var errors = validationResult(req);

    try {
        if (errors.array().length == 0) {
            var credentials = req.body;
            var lang = req.headers.language;

            return new Promise(function (resolve, reject) {

                if (!credentials.text || credentials.text == '') {
                    res.json({
                        status: statics.STATUS_FAILURE,
                        code: codes.FAILURE,
                        message: 'text',
                        data: null
                    });
                } else if (!credentials.image || credentials.image == '') {
                    res.json({
                        status: statics.STATUS_FAILURE,
                        code: codes.FAILURE,
                        message: 'image',
                        data: null
                    });
                } else {
                    return new Promise(function (resolve, reject) {
                        PartnerService.update(credentials).then(account => {
                            resolve(account);
                            languageService.get_lang(lang, 'SUCCESS').then(msg => {
                                res.json({
                                    status: statics.STATUS_SUCCESS,
                                    code: codes.SUCCESS,
                                    message: msg.message,
                                    data: account
                                });
                            });
                        },
                            error => {
                                reject(error);
                            }
                        );

                    });
                }
            })
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
    } catch (ex) {
        console.log(ex);
    }
});

module.exports = router;