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

// Example usage
// const username = "JohnDoe";
// const password = "secret";

//createUser(username, password);

// Example usage
  const
  userId = 1;
  const
  gameId = 2;

// getPosition(userId, gameId)
//   .then(position => {
//     console.log(position);
//   })

//setGameStatus(2, 'comted')
  // .then(game => {
  //   console.log("Game status set:", game.dataValues.State);
  // })
  // .catch(error => {
  //   console.error(error);
  // });

// getGameStatus(gameId)
//   .then(status => {
//     console.log("Game status:", status);
//   })
//   .catch(error => {
//     console.error(error);
//   });

// (async () => {
//   try {
//     const username = await getUsernameById(userId);
//     console.log(username);

//     const numberOfPlayers = await getCurrentNumberOfPlayers(gameId);
//     console.log(numberOfPlayers);
//   } catch (error) {
//     console.error(error);
//   }
// })();


// checkCredentials(username, password)
//   .then(result => {
//     console.log(result); // true or false
//   })
//   .catch(error => {
//     console.error(error);
//   });

}



const database_functions = new Database_functions();

export default database_functions;