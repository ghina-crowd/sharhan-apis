var models = require('../models/models.js');
var commonRepository = require('./common.js');
const sequelize = require('sequelize');
const Op = sequelize.Op;
var lang = require('../app');
var companies, Category, Former, Unit, Country, Types, Tender;

var companyRepository = {

    filters: function (filters) {


        var pageSize = Number(filters.size); // page start from 0
        const offset = filters.page * pageSize;

        var datacompany = {}
        var dataCategory = {}

        if (filters.category_id) {
            datacompany.category_id = filters.category_id
        }
        if (filters.sub_category_id) {
            datacompany.sub_category_id = filters.sub_category_id
        }
        if (filters.sub_category_id) {
            datacompany.sub_category_id = filters.sub_category_id
        }



        if (filters.company_name) {
            if (lang.acceptedLanguage == 'en') {
                datacompany.title_en = {
                    [Op.like]: '%' + filters.company_name + '%'
                }
            } else {
                datacompany.title_ar = {
                    [Op.like]: '%' + filters.company_name + '%'
                }
            }
        }

        if (lang.acceptedLanguage == 'en') {
            companies = ['company_id', ['title_en', 'title'], ['description_en', 'description'], 'image', 'link'];

        } else {
            companies = ['company_id', ['title_ar', 'title'], ['description_ar', 'description'], 'image', 'link'];
        }




        return new Promise(function (resolve, reject) {

            models.Company.findAll({
                distinct: true,
                attributes: companies,
                order: [['company_id', 'DESC']],

            }).then((companies => {
                if (companies == null) {
                    resolve([]);
                } else {
                    resolve(companies);
                }
            }), error => {
                reject(error);
            })
        });




    },

    filtersAdmin: function (filters) {


        var pageSize = Number(filters.size); // page start from 0
        const offset = filters.page * pageSize;

        var datacompany = {}

        if (filters.category_id) {
            datacompany.category_id = filters.category_id
        }
        if (filters.sub_category_id) {
            datacompany.sub_category_id = filters.sub_category_id
        }
        if (filters.sub_category_id) {
            datacompany.sub_category_id = filters.sub_category_id
        }

        if (filters.company_name) {
            if (lang.acceptedLanguage == 'en') {
                datacompany.title_en = {
                    [Op.like]: '%' + filters.company_name + '%'
                }
            } else {
                datacompany.title_ar = {
                    [Op.like]: '%' + filters.company_name + '%'
                }
            }
        }


        return new Promise(function (resolve, reject) {

            models.Company.findAll({
                distinct: true,
                order: [['company_id', 'DESC']],
            }).then((companies => {
                if (companies == null) {
                    resolve([]);
                } else {
                    resolve(companies);
                }
            }), error => {
                reject(error);
            })
        });




    },
    get: function (company_id) {



        if (lang.acceptedLanguage == 'en') {
            companies = ['company_id', ['title_en', 'title'], ['description_en', 'description'], 'image', 'link'];

        } else {
            companies = ['company_id', ['title_ar', 'title'], ['description_ar', 'description'], 'image', 'link'];
        }

        return new Promise(function (resolve, reject) {
            models.Company.findOne({
                where: { company_id: company_id }, attributes: companies,
            }).then(Company => {
                if (Company == null) {
                    resolve({});
                } else {
                    resolve(Company);
                }
            }, error => {
                reject(error);
            });
        });


    },
    getAdmin: function (company_id) {


        return new Promise(function (resolve, reject) {
            models.Company.findOne({
                where: { company_id: company_id }
            }).then(Company => {
                if (Company == null) {
                    resolve({});
                } else {
                    resolve(Company);
                }
            }, error => {
                reject(error);
            });
        });


    },
    create: async function (newcompanies) {
        return new Promise(async function (resolve, reject) {
            models.Company.create({
                title_en: newcompanies.title_en,
                title_ar: newcompanies.title_ar,
                description_en: newcompanies.description_en,
                description_ar: newcompanies.description_ar,
                image: newcompanies.image,
                link: newcompanies.link
            }).then(async company => {
                resolve(company);
            }, error => {
                {
                    console.log('reject', error)
                    reject(error)
                }
            });
        });
    },
    update: async function (newcompanies) {

        return new Promise(async function (resolve, reject) {
            models.Company.update({
                title_en: newcompanies.title_en,
                title_ar: newcompanies.title_ar,
                description_en: newcompanies.description_en,
                description_ar: newcompanies.description_ar,
                image: newcompanies.image,
                link: newcompanies.link
            }, { where: { company_id: newcompanies.company_id } }).then(async company => {
                companyRepository.getAdmin(newcompanies.company_id).then((companyupdated) => {
                    resolve(companyupdated);
                }, error => {
                    reject(error)
                });

            }, error => {
                reject(error)
            });
        });
    },
    delete: function (company_id) {
        return new Promise(function (resolve, reject) {
            models.Company.destroy({ where: { company_id: company_id } }).then(deleted => {
                resolve(deleted);
            }, error => {
                reject(error);
            });
        });
    }
};


Object.assign(companyRepository, commonRepository);
module.exports = companyRepository;