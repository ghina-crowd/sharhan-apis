/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('partner', {
    partner_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    text: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'partner'
  });
};
