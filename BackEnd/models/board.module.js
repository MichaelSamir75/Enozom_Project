const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Board = sequelize.define('Board', {
  BoardId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  BoardName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  PathToBoard: {
    type: DataTypes.STRING,
    allowNull: false,

  },
}, {
    timestamps: false,
  });

module.exports = Board;
