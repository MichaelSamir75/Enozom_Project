const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Board = require('./board.module'); 
const User = require('./user.module'); 

 const Game = sequelize.define('Game', {
  RoomId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  LastMove: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  NumberOfPlayers: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  State: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  BoardId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Board,
      key: 'BoardId',
    },
  },
  Turn: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  CurrentNoPlayers:{
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  timestamps: false,
});

module.exports = Game; 

// sequelize.sync().then(() => {
//     console.log('User table created successfully!');
//  }).catch((error) => {
//     console.error('Unable to create table : ', error);
//  });
 