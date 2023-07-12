'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    static associate(models) {
      Player.belongsTo(models.Game, { foreignKey: 'GameId' });
      Player.belongsTo(models.User, { foreignKey: 'UserId' });
    }
  }
  Player.init({
    GameId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Games',
        key: 'RoomId',
      },
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Users',
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
    Colour:{
      type:DataTypes.STRING,
      allowNull: false,
    }
    // GameId: {
    //   primaryKey: true,
    //   type: DataTypes.INTEGER
    // },
    // UserId: DataTypes.INTEGER,
    // Position: DataTypes.INTEGER,
    // TurnOrder: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Player',
    timestamps: false
  });
  return Player;
};