'use strict';

const faker = require('faker')
class Trait {
  constructor(typeId, name) {
    this.typeId = typeId;
    this.name = name;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Traits', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      typeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'TraitTypes'
        }
      },
      name: {
        type: Sequelize.STRING,
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
    
    return queryInterface.bulkInsert('Traits', [
      
      
      
      
      
      
      
      new Trait(1, 'Fredrick'),
      new Trait(1, 'Delphia'),
      new Trait(1, 'Donato'),
      new Trait(1, 'Haley'),
      new Trait(1, 'Myrna'),
      new Trait(1, faker.name.firstName()),
      new Trait(1, faker.name.firstName()),
      new Trait(1, faker.name.firstName()),
      new Trait(1, faker.name.firstName()),
      new Trait(1, faker.name.firstName()),
      new Trait(1, faker.name.firstName()),
      new Trait(1, faker.name.firstName()),
      new Trait(1, faker.name.firstName()),
      new Trait(1, faker.name.firstName()),
      new Trait(1, faker.name.firstName()),
      new Trait(1, faker.name.firstName()),
      new Trait(1, faker.name.firstName()),
      new Trait(1, faker.name.firstName()),
      new Trait(1, faker.name.firstName()),
      new Trait(1, faker.name.firstName()),
      new Trait(1, faker.name.firstName()),
      new Trait(1, faker.name.firstName()),
      new Trait(1, faker.name.firstName()),
      new Trait(1, faker.name.firstName()),
      new Trait(1, faker.name.firstName()),
      new Trait(1, faker.name.firstName()),
      new Trait(1, faker.name.firstName()),
      new Trait(2, 'Wyman'),
      new Trait(2, `D'Amore`),
      new Trait(2, 'Gutmann'),
      new Trait(2, 'Braun'),
      new Trait(2, 'Blick'),
      new Trait(2, faker.name.lastName()),
      new Trait(2, faker.name.lastName()),
      new Trait(2, faker.name.lastName()),
      new Trait(2, faker.name.lastName()),
      new Trait(2, faker.name.lastName()),
      new Trait(2, faker.name.lastName()),
      new Trait(2, faker.name.lastName()),
      new Trait(2, faker.name.lastName()),
      new Trait(2, faker.name.lastName()),
      new Trait(2, faker.name.lastName()),
      new Trait(2, faker.name.lastName()),
      new Trait(2, faker.name.lastName()),
      new Trait(2, faker.name.lastName()),
      new Trait(2, faker.name.lastName()),
      new Trait(2, faker.name.lastName()),
      new Trait(2, faker.name.lastName()),
      new Trait(2, faker.name.lastName()),
      new Trait(2, faker.name.lastName()),
      new Trait(2, faker.name.lastName()),
      new Trait(2, faker.name.lastName()),
      new Trait(2, faker.name.lastName()),
      new Trait(2, faker.name.lastName()),
      new Trait(3, 'Scar down the right side of face'),
      new Trait(3, 'Missing an eye'),
      new Trait(3, 'Walks with a significant limp'),
      new Trait(3, 'Stutters'),
      new Trait(3, 'Thick accent'),
      new Trait(3, 'Deaf'),
      new Trait(3, 'Excessively energetic'),
      new Trait(3, 'Constantly jittering'),
      new Trait(3, 'Half of face is paralyzed'),
      new Trait(3, 'Tattooed face'),
      new Trait(3, 'Booming voice'),
      new Trait(3, 'Mousy voice'),
      new Trait(3, 'Heavy footed'),
      new Trait(3, 'Hulking frame'),
      new Trait(3, 'Scrawny'),
      new Trait(3, 'Cross eyed'),
      new Trait(3, 'Walks with a swagger'),
      new Trait(4, 'Physically strong'),
      new Trait(4, 'Nimble'),
      new Trait(4, 'High pain tolerance'),
      new Trait(4, 'Wise'),
      new Trait(4, 'Intelligent'),
      new Trait(4, 'Charismatic'),
      new Trait(4, 'High Integrity'),
      new Trait(4, 'Brave'),
      new Trait(4, 'Well connected'),
      new Trait(4, 'Observant'),
      new Trait(5, 'Pathological liar'),
      new Trait(5, 'Compulsively honest'),
      new Trait(5, 'Cheater'),
      new Trait(5, 'Coward'),
      new Trait(5, 'Short Tempered'),
      new Trait(5, `Has to prove they're the smartest person in the room`),
      new Trait(5, 'Codependent'),
      new Trait(5, 'Prideful'),
      new Trait(5, 'Greedy'),
      new Trait(5, 'Zealot'),
      new Trait(5, 'Avoids conflict'),
      new Trait(5, 'Selfish'),
      new Trait(5, 'Sociopath'),
      new Trait(5, 'Addiction'),
      new Trait(5, 'Compulsive gambler'),
      new Trait(6, 'Achieve perfection'),
      new Trait(6, 'Pleasure'),
      new Trait(6, 'Self-preservation at all costs'),
      new Trait(6, 'Revenge'),
      new Trait(6, 'Redemption'),
      new Trait(6, 'Popularity'),
      new Trait(6, 'Love'),
      new Trait(6, 'Justice'),
      new Trait(6, 'Absolve guilt'),
      new Trait(6, 'Freedom'),
      new Trait(6, 'Wealth / Money'),
      new Trait(6, 'Family'),
      new Trait(6, 'Fame'),
      new Trait(6, 'Fulfill their destiny'),
      new Trait(6, 'Cheat death'),
      new Trait(6, 'Be respected'),
      new Trait(7, 'Black market fence'),
      new Trait(7, 'Involved in a Cult'),
      new Trait(7, 'Engages in activities they publicly chastise'),
      new Trait(7, 'An illegitimate child of a powerful politician'),
      new Trait(7, 'Wealthier than their lifestyle appears'),
      new Trait(7, 'A carrier of a highly infectious disease'),
      new Trait(7, 'The notorious local thief'),
      new Trait(7, 'A renowned hero of a distant land'),
      new Trait(7, 'A spy'),
      new Trait(7, 'Provides safe harbor for those hiding from the law'),
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Traits', null, {});
    return queryInterface.dropTable('Traits');
  }
};