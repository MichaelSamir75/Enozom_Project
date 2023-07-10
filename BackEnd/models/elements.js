'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Elements extends Model {
    static associate(models) {
      // Define associations here
      Elements.belongsTo(models.Board, { foreignKey: 'BoardId' });
    }
  }
  Elements.init({
    Index: DataTypes.INTEGER,
    BoardId: DataTypes.INTEGER,
    From: DataTypes.INTEGER,
    To: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Elements',
  });
  return Elements;
};