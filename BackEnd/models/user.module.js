const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const User = sequelize.define("User", { 
  UserId: {
     type: DataTypes.INTEGER,
     allowNull: false,
     primaryKey: true,
     autoIncrement: true,
   },
   Username: {
     type: DataTypes.STRING,
     allowNull: false,
     unique: true
   },
   Password: {
     type: DataTypes.STRING,
     allowNull: false
   }
}, {
  timestamps: false,
});

module.exports = User;

// sequelize.sync().then(() => {
//     console.log('User table created successfully!');
//  }).catch((error) => {
//     console.error('Unable to create table : ', error);
//  });
 