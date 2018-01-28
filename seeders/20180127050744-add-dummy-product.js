'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
      */

      return queryInterface.bulkInsert('Products', [{
        name: 'Fanta Kaleng Merah 330ml',
        stock : 122,
        price : 7400,
        description : 'Rasa strawberry',
        imgSource : 'https://assets.honestbee.com/products/images/480/transretail_10003005001_10003005001-1.jpg',
        createdAt : new Date()
      },{
        name: 'Fanta Kaleng Orange 330ml',
        stock : 21,
        price : 8000,
        description : 'Rasa jeruk',
        imgSource : 'http://clipground.com/images/fanta-clipart-8.jpg',
        createdAt : new Date()
      },{
        name: 'Fanta Kaleng Ungu 330ml',
        stock : 10,
        price : 7800,
        description : 'Rasa anggur',
        imgSource : 'https://americanfizz.co.uk/image/cache/catalog/american-soda/fanta-grape-can-800x800.jpg',
        createdAt : new Date()
      },{
        name: 'Fanta Kaleng Biru 330ml',
        stock : 132,
        price : 8500,
        description : 'Rasa bluberry',
        imgSource : 'https://www.bizzy.co.id/media/catalog/product/cache/image/700x560/e9c3970ab036de70892d86c6d221abfe/C/O/CONF-xiBUEz7EEiXl7hWeelyL.jpg',
        createdAt : new Date()
      }
    ], {});

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
