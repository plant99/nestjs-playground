'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Setting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Setting.init({
    name: DataTypes.STRING,
    data_type: DataTypes.STRING,
    account_id: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Accounts'
        },
        key: 'id',
      }
    },
    value: DataTypes.STRING,
    deletedAt: DataTypes.DATE,
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Setting',
  });
  return Setting;
};