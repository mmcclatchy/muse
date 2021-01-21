'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TraitTypes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    
    return queryInterface.bulkInsert('TraitTypes', [
      { id: 1, type: 'firstName', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, type: 'lastName', createdAt: new Date(), updatedAt: new Date() },
      { id: 3, type: 'physical', createdAt: new Date(), updatedAt: new Date() },
      { id: 4, type: 'strengths', createdAt: new Date(), updatedAt: new Date() },
      { id: 5, type: 'weaknesses', createdAt: new Date(), updatedAt: new Date() },
      { id: 6, type: 'motivations', createdAt: new Date(), updatedAt: new Date() },
      { id: 7, type: 'secrets', createdAt: new Date(), updatedAt: new Date() },
    ])
    
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('TraitTypes', null, {})
    return queryInterface.dropTable('TraitTypes');
  }
};