var { sequelize, Sequelize } = require('../util/db.js');

var contact = require('./Contact');
var partner = require('./Partner');
var company = require('./Company');
var users = require('./users');

module.exports = {
    Contact: contact(sequelize, Sequelize),
    Partner: partner(sequelize, Sequelize),
    Company: company(sequelize, Sequelize),
    User: users(sequelize, Sequelize),
};