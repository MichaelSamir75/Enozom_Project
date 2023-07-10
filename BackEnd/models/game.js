'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    static associate(models) {
      // Define associations here
      Game.belongsTo(models.Board, { foreignKey: 'BoardId' });
    }
  }
  Game.init({
    RoomId: DataTypes.INTEGER,
    LastMove: DataTypes.DATE,
    NumberOfPlayers: DataTypes.INTEGER,
    State: DataTypes.STRING,
    BoardId: DataTypes.INTEGER,
    Turn: DataTypes.INTEGER,
    CurrentNoPlayers: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};