'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert(
        'Books', 
        [
          {
            title: 'Kecamuk Darah (Troubled Blood)',
            author: 'Robert Galbraith',
            image: 'uploads/image_1.png',
            published : new Date(),
            price: 90,
            stock: 100,
            user: 1,
            category:2,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            title: 'Selena dan Nebula',
            author: 'Tere Liye',
            image: 'uploads/image_2.png',
            published : new Date(),
            price: 90,
            stock: 100,
            user: 1,
            category:1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            title: 'Pelukis Bisu (The Silent Patient)',
            author: 'Alex Michaelides',
            image: 'uploads/image_3.png',
            published : new Date(),
            price: 90,
            stock: 100,
            user: 1,
            category:2,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            title: 'Kitab Kawin (Edisi Cover Baru)',
            author: 'Laksmi Pamuntjak',
            image: 'uploads/image_4.png',
            published : new Date(),
            price: 90,
            stock: 100,
            user: 1,
            category:3,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ], 
      {}
    );
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('Books', null, {});
  }
};
