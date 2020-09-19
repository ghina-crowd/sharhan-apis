var models = require('../models/models.js');
var commonRepository = require('./common.js');


var PartnerRepository = {

    getAllPartnersAdmin: function () {
        return new Promise(function (resolve, reject) {
            models.Partner.findAll({ order: [['partner_id', 'ASC']] }).then((Partners => {
                if (Partners == null) {
                    resolve(null);
                } else {
                    resolve(Partners);
                }
            }), error => {
                reject(error);
            })
        });
    },
    getAllPartners: function () {

        return new Promise(function (resolve, reject) {
            models.Partner.findAll({}).then((Partners => {
                if (Partners == null) {
                    resolve(null);
                } else {
                    resolve(Partners);
                }
            }), error => {
                reject(error);
            })
        });
    },
    update: function (newPartnerData) {
        return new Promise(function (resolve, reject) {
            models.Partner.update({
                image: newPartnerData.image,
            }, { where: { partner_id: newPartnerData.partner_id } }).then(Partner => {
                models.Partner.findOne({ where: { partner_id: newPartnerData.partner_id } }).then((Partner => {
                    if (Partner == null) {
                        resolve({});
                    } else {
                        resolve(Partner);
                    }
                }), error => {
                    reject(error);
                })
            }, error => {
                reject(error)
            });
        });
    },


    createPartner: function (newPartnerData) {
        return new Promise(function (resolve, reject) {
            models.Partner.create({
                image: newPartnerData.image,
            }).then(contact => {
                resolve(contact);
            }, error => {
                reject(error)
            });
        });
    },


    deletePartner: function (partner_id) {
        return new Promise(function (resolve, reject) {
            models.Partner.destroy({ where: { partner_id: partner_id } }).then(deleted => {
                resolve(deleted);
            }, error => {
                reject(error);
            });
        });
    }

};
Object.assign(PartnerRepository, commonRepository);
module.exports = PartnerRepository;