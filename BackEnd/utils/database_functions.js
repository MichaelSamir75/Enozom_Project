const User = require('../models/user.module');
const Game = require('../models/game.module');
const Player = require('../models/player.module');
const Board = require('../models/board.module');
const Elements = require('../models/elements.module');

class Database_functions {

  async getUsernameById(userId) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error(`User not found with ID ${userId}`);
      }
      return user.dataValues.Username;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getNumberOfPlayers(RoomId) {
    try {
      const game = await Game.findByPk(RoomId);
      if (!game) {
        throw new Error(`Game not found with ID ${RoomId}`);
      }
      return game.dataValues.NumberOfPlayers;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getCurrentNumberOfPlayers(RoomId) {
    try {
      const game = await Game.findByPk(RoomId);
      if (!game) {
        throw new Error(`Game not found with ID ${RoomId}`);
      }
      return game.dataValues.CurrentNoPlayers;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

// function for register
  async createUser(username, password) {
    try {
      const user = await User.create({
        Username: username,
        Password: password
      });
      console.log("User created:", user);
      return user;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

// function for login
  async checkCredentials(username, password) {
    try {
      const user = await User.findOne({where: {Username: username, Password: password}});
      return !!user; // Returns true if user exists, false otherwise
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  async checkUsernameUnique(username) {
    try {
      const user = await User.findOne({ where: { Username: username } });
      return !!user; // Returns true if username exists, false otherwise
    } catch (error) {
      console.error(error);
      throw error;
    }
  }


  async getPosition(userId, gameId) {
    try {
      const player = await Player.findOne({
        where: {GameId: gameId, UserId: userId},
        attributes: ['Position']
      });

      if (!player) {
        throw new Error(`Player not found with Game ID ${gameId} and User ID ${userId}`);
      }

      return player.dataValues.Position;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async setGameTurn(RoomId, Turn) {
    try {
      const updatedRows = await Game.update(
          {Turn: Turn},
          {where: {RoomId: RoomId}}
      );

      if (updatedRows[0] === 0) {
        throw new Error(`Game not found with ID ${gameId}`);
      }

      return Turn;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async getGameTurn(gameId) {
    try {
      const game = await Game.findByPk(gameId);
      if (!game) {
        throw new Error(`Game not found with ID ${gameId}`);
      }
      console.log(game)
      return game.dataValues.Turn;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async setGameStatus(RoomId, State) {
    try {
      const updatedRows = await Game.update(
          {State: State},
          {where: {RoomId: RoomId}}
      );

      if (updatedRows[0] === 0) {
        throw new Error(`Game not found with ID ${gameId}`);
      }

      return State;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getGameStatus(gameId) {
    try {
      const game = await Game.findByPk(gameId);
      if (!game) {
        throw new Error(`Game not found with ID ${gameId}`);
      }
      console.log(game)
      return game.dataValues.State;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getUserIdByGameIdAndTurnOrder(GameId, turnOrder) {
    try {
      const player = await Player.findOne({
        where: { GameId: GameId, TurnOrder: turnOrder },
        attributes: ['UserId']
      });

      if (!player) {
        throw new Error(`Player not found with Game ID ${GameId} and Turn Order ${turnOrder}`);
      }

      return player.dataValues.UserId;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getPositionByTurnOrderAndGameId(turnOrder, gameId) {
    try {
      const player = await Player.findOne({
        where: { TurnOrder: turnOrder, GameId: gameId },
        attributes: ['Position']
      });

      if (!player) {
        throw new Error(`Player not found with Turn Order ${turnOrder} and Game ID ${gameId}`);
      }

      return player.dataValues.Position;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getUserIdByGameId(gameId) {
    try {
      const turn = await this.getGameTurn(gameId);
      const userId = await this.getUserIdByGameIdAndTurnOrder(gameId, turn);
      return userId;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getUserPositionByGameId(gameId) {
    try {
      const turn = await this.getGameTurn(gameId);
      const position = await this.getPositionByTurnOrderAndGameId(gameId, turn);
      return position;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async setLastMove(gameId, lastMove) {
    try {
      const game = await Game.findByPk(gameId);

      if (!game) {
        throw new Error(`Game not found with ID ${gameId}`);
      }

      game.LastMove = lastMove;
      await game.save();

      return lastMove;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getLastMove(RoomId) {
    try {
      const game = await Game.findByPk(RoomId);

      if (!game) {
        throw new Error(`Game not found with ID ${RoomId}`);
      }
      return game.dataValues.LastMove;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async getElementsByBoardId(BoardId) {
    try {
      const elements = await Elements.findAll({
        where: { BoardId: BoardId },
        attributes: ['From', 'To']
      });

      return elements.map(element => ({
        From: element.dataValues.From,
        To: element.dataValues.To
      }));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createGame(NumberOfPlayers,BoardId) {
    try {
      const game = await Game.create({
        NumberOfPlayers: NumberOfPlayers,
        BoardId: BoardId,
        State: "Pending",
        CurrentNoPlayers:0,
        LastMove:new Date(),
        Turn : 1
      });
      console.log("Game created:", game);
      return game.dataValues.RoomId;
    } catch (error) {
      console.error("Error creating game:", error);
      throw error;
    }
  }

  async getBoardIdByRoomId(RoomId) {
    try {
      const game = await Game.findByPk(RoomId);

      if (!game) {
        throw new Error(`Game not found with Room ID ${RoomId}`);
      }

      return game.dataValues.BoardId;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }


}




const dbFunctions = new Database_functions();

// Example usage
// const userId = 1;
// const gameId = 1;


// dbFunctions.getElementsByBoardId(1)
//   .then(elements => {
//     console.log(elements);
//   })
//   .catch(error => {
//     console.error(error);
//   });


  const roomId = 1;

dbFunctions.getBoardIdByRoomId(roomId)
  .then(boardId => {
    console.log('BoardId:', boardId);
  })
  .catch(error => {
    console.error(error);
  });

  module.exports = Database_functions;
  