const sequelize = require('./database');
const User = require('./models/user.module');
const Board = require('./models/board.module');
const Game = require('./models/game.module');
const Elements = require('./models/elements.module');
const Player = require('./models/player.module');



sequelize.sync()
  .then(() => {
    console.log('All tables created successfully!');
  })
  .catch((error) => {
    console.error('Unable to create tables: ', error);
  });
