const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./user.module');
const Game = require('./game.module');

const Player = sequelize.define('Player', {
    GameId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: Game,
        key: 'RoomId',
      },
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: User,
        key: 'UserId',
      },
    },
    Position: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    TurnOrder: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    timestamps: false,
  });
  
  module.exports = Player;
   

// sequelize.sync().then(() => {
//     console.log('User table created successfully!');
//  }).catch((error) => {
//     console.error('Unable to create table : ', error);
//  });
 