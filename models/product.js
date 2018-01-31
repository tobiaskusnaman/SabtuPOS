'use strict';
module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        isInt:{
          msg:'Please enter a valid value'
        }
      }
    },
    price: DataTypes.INTEGER,
    description: DataTypes.STRING,
    imgSource: DataTypes.STRING
  })

  Product.associate = function (models) {
    Product.hasMany(models.InvoiceDetail);
  };


  return Product;
};
