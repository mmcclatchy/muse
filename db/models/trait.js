'use strict';
module.exports = (sequelize, DataTypes) => {
  const Trait = sequelize.define('Trait', {
    typeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  Trait.associate = function(models) {
    
    Trait.belongsToMany(models.Character, { 
      through: models.CharacterTrait,
      foreignKey: 'traitId',
      otherKey: 'characterId',
    });
    
    Trait.belongsTo(models.TraitType, { foreignKey: 'typeId' });
    
  };
  
  Trait.prototype.cleanedForRedux = function(traitType) {
    return {
      id: this.id,
      name: this.name,
      type: traitType
      
    }
  }
  
  return Trait;
};