'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Primero, eliminar todos los registros existentes para evitar duplicados
    await queryInterface.bulkDelete('Pictograms', null, {});

    // Luego, insertar los registros iniciales
    await queryInterface.bulkInsert('Pictograms', [
      { name: 'Comer', imageUrl: 'https://samuelexpicto.vercel.app/images/comer.png', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Beber', imageUrl: 'https://samuelexpicto.vercel.app/images/beber.png', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Baño', imageUrl: 'https://samuelexpicto.vercel.app/images/bano.png', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Jugar', imageUrl: 'https://samuelexpicto.vercel.app/images/jugar.png', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Dormir', imageUrl: 'https://samuelexpicto.vercel.app/images/dormir.png', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Plaza', imageUrl: 'https://samuelexpicto.vercel.app/images/plaza.png', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Pelota', imageUrl: 'https://samuelexpicto.vercel.app/images/pelota.png', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Abrazo', imageUrl: 'https://samuelexpicto.vercel.app/images/abrazo.png', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Jugo', imageUrl: 'https://samuelexpicto.vercel.app/images/jugo.png', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Pictograms', null, {});
  }
};