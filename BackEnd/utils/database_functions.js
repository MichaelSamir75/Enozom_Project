const User = require('../models/user.module');
const Game = require('../models/game.module');
const Player = require('../models/player.module');
const Board = require('../models/board.module');
const Elements = require('../models/elements.module');

function getUsernameById(userId) {
  return User.findByPk(userId)
    .then(user => {
      if (!user) {
        throw new Error(`User not found with ID ${userId}`);
      }
      return user.dataValues.Username;
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
}

function getNumberOfPlayers(RoomId) {
  return Game.findByPk(RoomId)
    .then(game => {
      if (!game) {
        throw new Error(`Game not found with ID ${RoomId}`);
      }
      return game.dataValues.NumberOfPlayers;
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
}

// Example usage
const userId = 1;
const gameId = 2;

getUsernameById(userId)
  .then(username => {
    console.log(username);
  });

getNumberOfPlayers(gameId)
  .then(numberOfPlayers => {
    console.log(numberOfPlayers);
  });