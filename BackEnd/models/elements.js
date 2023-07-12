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
    Index: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    BoardId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Boards',
        key: 'BoardId',
      },
    },
    From: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    To: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // Index: DataTypes.INTEGER,
    // BoardId: DataTypes.INTEGER,
    // From: DataTypes.INTEGER,
    // To: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Elements',
    timestamps: false
  });
  return Elements;
};