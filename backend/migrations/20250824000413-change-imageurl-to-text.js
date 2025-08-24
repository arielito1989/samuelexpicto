'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Pictograms', 'imageUrl', {
      type: Sequelize.TEXT,
      allowNull: true, // o false, dependiendo de tus requerimientos
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Pictograms', 'imageUrl', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  }
};
