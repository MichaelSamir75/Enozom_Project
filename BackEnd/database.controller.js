const Sequelize = require("sequelize");
const sequelize = new Sequelize(
 'sequalizedb',
 'root',
  'mysqlpassword123',
  {
    host: 'localhost',
    dialect: 'mysql'
  }
);
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

const User = sequelize.define("User", {
   UserId: {
     type: Sequelize.INTEGER,
     allowNull: false,
     primaryKey: true,
     autoIncrement: true,
   },
   Username: {
     type: Sequelize.STRING,
     allowNull: false,
     unique: true
   },
   Password: {
     type: Sequelize.STRING,
     allowNull: false
   }
});


sequelize.sync().then(() => {
    console.log('Book table created successfully!');
 
    User.create({
        Username: "Martin",
        Password: "151301234",
    }).then(res => {
        console.log(res)
    }).catch((error) => {
        console.error('Failed to create a new record : ', error);
    });
 
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });