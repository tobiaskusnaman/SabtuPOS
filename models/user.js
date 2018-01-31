'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      validate: {
        len:{
          args: 3,
          msg: "Name must have a minimum of 3 characters in length"
        },
        isAlpha: {
          msg: "Name must only contain letters"
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        len:{
          args: 3,
          msg: "Name must have a minimum 3 characters in length"
        },
        isAlpha: {
          msg: "Name must only contain letters"
        }
      }
    },
    email:{
      type : DataTypes.STRING,
      validate: {
        isEmail:{
          msg:"Email address must be valid"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        isAlphanumeric: true
      }
    },
    type: {
      type: DataTypes.STRING,

    },
    isMember: {
      type: DataTypes.STRING,
    }

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
