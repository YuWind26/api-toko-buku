'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up (queryInterface, Sequelize) {
      const hash = bcrypt.hashSync('Ucup123', 10);
      await queryInterface.bulkInsert('Users', [{
        name: 'Ucup',
        email: 'admin123@gmail.com',
        password: hash,
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('Users', null, {});
    
  }
};
