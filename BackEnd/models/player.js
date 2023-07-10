'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    static associate(models) {
      // Define associations here
      Player.belongsTo(models.Game, { foreignKey: 'GameId' });
      Player.belongsTo(models.User, { foreignKey: 'UserId' });
    }
  }
  Player.init({
    GameId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    Position: DataTypes.INTEGER,
    TurnOrder: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Player',
  });
  return Player;
};