var express = require('express');
const { validationResult } = require('express-validator/check');
var languageService = require('../validator/language');
var statics = require('../constant/static.js');
var codes = require('../constant/code.js');
var companysService = require('../service/company');
var i18n = require("i18n");



var router = express.Router();

router.get('/get', async function (req, res) {
    var errors = validationResult(req);
    if (errors.array().length == 0) {


        var lang = req.headers.language;
        var data = req.body;
        var category_id = Number(data.category_id) ? Number(data.category_id) : 0;
        var sub_category_id = Number(data.sub_category_id) ? Number(data.sub_category_id) : 0;

        var size = data.size ? data.size : 12;
        var page = req.body.page ? req.body.page : 0;
        var have_tender = req.body.have_tender ? req.body.have_tender : -1;
        var company_name = req.body.company_name ? req.body.company_name : '';

        var filters = {};
        filters.category_id = category_id;
        filters.sub_category_id = sub_category_id;
        filters.page = page;
        filters.size = size;
        filters.have_tender = have_tender;
        filters.company_name = company_name;



        {
            return new Promise(function (resolve, reject) {
                companysService.filters(filters).then(companys => {
                    resolve(companys);
                    if (companys == null || companys.length == 0) {
                        languageService.get_lang(lang, 'DATA_NOT_FOUND').then(msg => {
                            res.json({
                                status: statics.STATUS_FAILURE,
                                code: codes.FAILURE,
                                message: msg.message,
                                data: [],
                            });
                        });
                    } else {
                        languageService.get_lang(lang, 'DATA_FOUND').then(msg => {
                            res.json({
                                status: statics.STATUS_SUCCESS,
                                code: codes.SUCCESS,
                                message: msg.message,
                                data: companys,
                            });
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
        })
    }
});
router.get('/get/:company_id', async function (req, res) {
    lang = req.headers.language;
    var errors = validationResult(req);
    if (errors.array().length == 0) {
        var lang = req.headers.language;
        var token = req.headers.authorization;
        return new Promise(function (resolve, reject) {
            companysService.get(req.params.company_id).then(kitchens => {
                resolve(kitchens);
                if (kitchens == null) {
                    kitchens = [];
                }
                languageService.get_lang(lang, 'SUCCESS').then(msg => {
                    res.json({
                        status: statics.STATUS_SUCCESS,
                        code: codes.SUCCESS,
                        message: msg.message,
                        data: kitchens
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

                if (!credentials.title_en || credentials.title_en == '') {
                    res.json({ status: statics.STATUS_FAILURE, code: codes.FAILURE, message: i18n.__('title_en'), data: null })
                } else if (!credentials.title_ar || credentials.title_ar == '') {
                    res.json({ status: statics.STATUS_FAILURE, code: codes.FAILURE, message: i18n.__('title_ar'), data: null })
                } else if (!credentials.description_en || credentials.description_en == '') {
                    res.json({ status: statics.STATUS_FAILURE, code: codes.FAILURE, message: i18n.__('description_en'), data: null })
                } else if (!credentials.description_ar || credentials.description_ar == '') {
                    res.json({ status: statics.STATUS_FAILURE, code: codes.FAILURE, message: i18n.__('description_ar'), data: null })
                } else if (!credentials.link || credentials.link == '') {
                    res.json({ status: statics.STATUS_FAILURE, code: codes.FAILURE, message: i18n.__('link'), data: null })
                } else if (!credentials.image || credentials.image == '') {
                    res.json({ status: statics.STATUS_FAILURE, code: codes.FAILURE, message: i18n.__('image'), data: null })
                } else {
                    return new Promise(function (resolve, reject) {

                        companysService.create(credentials).then(company => {
                            resolve(company);
                            languageService.get_lang(lang, 'SUCCESS').then(msg => {
                                res.json({
                                    status: statics.STATUS_SUCCESS,
                                    code: codes.SUCCESS,
                                    message: msg.message,
                                    data: company
                                });
                            });
                        },
                            error => {
                                reject(error);
                                languageService.get_lang(lang, 'INVALID_DATA').then(msg => {
                                    res.json({
                                        status: statics.STATUS_FAILURE,
                                        code: codes.INVALID_DATA,
                                        message: msg.message,
                                        data: error
                                    });
                                });
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
router.put('/update', async function (req, res) {
    var lang = req.headers.language;
    var errors = validationResult(req);
    try {
        if (errors.array().length == 0) {
            var credentials = req.body;
            var lang = req.headers.language;
            return new Promise(function (resolve, reject) {

                if (!credentials.company_id || credentials.company_id == '') {
                    res.json({ status: statics.STATUS_FAILURE, code: codes.FAILURE, message: i18n.__('company_id'), data: null })
                } else if (!credentials.title_en || credentials.title_en == '') {
                    res.json({ status: statics.STATUS_FAILURE, code: codes.FAILURE, message: i18n.__('title_en'), data: null })
                } else if (!credentials.title_ar || credentials.title_ar == '') {
                    res.json({ status: statics.STATUS_FAILURE, code: codes.FAILURE, message: i18n.__('title_ar'), data: null })
                } else if (!credentials.description_en || credentials.description_en == '') {
                    res.json({ status: statics.STATUS_FAILURE, code: codes.FAILURE, message: i18n.__('description_en'), data: null })
                } else if (!credentials.description_ar || credentials.description_ar == '') {
                    res.json({ status: statics.STATUS_FAILURE, code: codes.FAILURE, message: i18n.__('description_ar'), data: null })
                } else if (!credentials.link || credentials.link == '') {
                    res.json({ status: statics.STATUS_FAILURE, code: codes.FAILURE, message: i18n.__('link'), data: null })
                } else {
                    return new Promise(function (resolve, reject) {
                        companysService.update(credentials).then(company => {
                            resolve(company);
                            languageService.get_lang(lang, 'SUCCESS').then(msg => {
                                res.json({
                                    status: statics.STATUS_SUCCESS,
                                    code: codes.SUCCESS,
                                    message: msg.message,
                                    data: company
                                });
                            });
                        },
                            error => {
                                languageService.get_lang(lang, 'INVALID_DATA').then(msg => {
                                    res.json({
                                        status: statics.STATUS_FAILURE,
                                        code: codes.INVALID_DATA,
                                        message: msg.message,
                                        data: errors
                                    });
                                });
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
router.delete('/delete/:company_id', async function (req, res) {
    var lang = req.headers.language;
    var errors = validationResult(req);
    if (errors.array().length == 0) {
        var lang = req.headers.language;
        var token = req.headers.authorization;
        return new Promise(function (resolve, reject) {
            {

                return new Promise(function (resolve, reject) {
                    companysService.delete(req.params.company_id).then(company => {
                        resolve(company);

                        if (company) {
                            languageService.get_lang(lang, 'SUCCESS').then(msg => {
                                res.json({
                                    status: statics.STATUS_SUCCESS,
                                    code: codes.SUCCESS,
                                    message: msg.message,
                                    data: company
                                });
                            });
                        } else {
                            languageService.get_lang(lang, 'company_id').then(msg => {
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
}
);
module.exports = router;