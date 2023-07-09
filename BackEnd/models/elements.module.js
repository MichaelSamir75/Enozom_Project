const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Board = require('./board.module');

const Elements = sequelize.define('Elements', {
  Index: {
    type: DataTypes.INTEGER,
    autoIncrement : true,
    primaryKey :true,
    allowNull:false,
  },
  BoardId: {
    type: DataTypes.INTEGER,
    allowNull:false,
    references: {
      model: Board,
      key: 'BoardId',
    },
  },
  From: {
    type: DataTypes.INTEGER,
    allowNull:false,
  },
  To: {
    type: DataTypes.INTEGER,
    allowNull:false,
  },
}, {
  timestamps: false,
});

module.exports = Elements;
