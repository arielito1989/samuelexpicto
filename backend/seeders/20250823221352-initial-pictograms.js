'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Pictograms', [
      { name: 'Comer', imageUrl: '/images/comer.png', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Beber', imageUrl: '/images/beber.png', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Baño', imageUrl: '/images/bano.png', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Jugar', imageUrl: '/images/jugar.png', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Dormir', imageUrl: '/images/dormir.png', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Plaza', imageUrl: '/images/plaza.png', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Pictograms', null, {});
  }
};