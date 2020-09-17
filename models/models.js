var { sequelize, Sequelize } = require('../util/db.js');

var contact = require('./Contact');
var partner = require('./Partner');
var company = require('./Company');

module.exports = {
    Contact: contact(sequelize, Sequelize),
    Partner: partner(sequelize, Sequelize),
    Company: company(sequelize, Sequelize),
};