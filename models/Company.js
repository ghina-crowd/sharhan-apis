module.exports = function (sequelize, DataTypes) {
  return sequelize.define('company', {
    company_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    title_en: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    title_ar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description_en: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description_ar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    tableName: 'company'
  });
};
