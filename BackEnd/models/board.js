'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Board extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Board.init({
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
    // BoardId: DataTypes.INTEGER,
    // BoardName: DataTypes.STRING,
    // PathToBoard: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Board',
    timestamps: false
  });
  return Board;
};