const { DataTypes } = require('sequelize');
const sequelize = require('../database.js');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
});

sequelize.sync();
