import Sequelize from 'sequelize';
import User from './user.model';
import winston from 'winston';
require('dotenv').config();

const sequelize = new Sequelize(process.env.PG_NAME, process.env.PG_USER, process.env.PG_PASSWORD,{
  host: process.env.PG_HOST,
  dialect: "postgres",
  port: process.env.PG_PORT,
  logging: winston.info
});

// sequelize.authenticate()
//     .then(() => winston.info("Connection has been established successfully."))
//     .catch(err => winston.error("Unable to connect to the database: ", err));
console.log("start the CI/CD Nodejs application right now........");
User(sequelize, Sequelize.DataTypes);

const { models } = sequelize;
Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize, models };
