'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    type: DataTypes.STRING,
    isMember: DataTypes.BOOLEAN
  });

  User.beforeCreate(user => {
    if (user.password) {
      var bcrypt = require('bcrypt');
      const saltRounds = 10;
      return bcrypt.hash(user.password, saltRounds).then(function(hash) {
         user.password = hash
      });
    }
  })
  return User;
};
