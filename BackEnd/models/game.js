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
        model: 'Boards',
        key: 'BoardId',
      },
    },
    Turn: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    CurrentNoPlayers: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
    // RoomId: DataTypes.INTEGER,
    // LastMove: DataTypes.DATE,
    // NumberOfPlayers: DataTypes.INTEGER,
    // State: DataTypes.STRING,
    // BoardId: DataTypes.INTEGER,
    // Turn: DataTypes.INTEGER,
    // CurrentNoPlayers: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Game',
    timestamps: false
  });
  return Game;
};