require('dotenv').config();

const { Sequelize } = require("sequelize");

const dbName = process.env.DB_NAME;
const dbUsername = process.env.DB_USERNNAME;
const dbPwd = process.env.DB_PWD;

const sequelize = new Sequelize(dbName, dbUsername, dbPwd, {
    host: "localhost",
    dialect: "postgres",
    logging: false,
  });

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testConnection();

module.exports = sequelize;
