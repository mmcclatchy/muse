'use strict';
module.exports = (sequelize, DataTypes) => {
  const Character = sequelize.define('Character', {
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
    bio: DataTypes.STRING
  }, {});
  Character.associate = function(models) {
    
    Character.belongsToMany(models.Scene, {
      through: models.SceneCharacter,
      foreignKey: 'characterId',
      otherKey: 'sceneId',
    });
    
    Character.belongsToMany(models.Trait, { 
      through: models.CharacterTrait,
      foreignKey: 'characterId',
      otherKey: 'traitId',
    });
    
  };
  
  Character.prototype.cleanedForRedux = function() {
    return {
      [this.id]: {
        id: this.id,
        firstName: this.firstName,
        lastName: this.lastName,
        imageUrl: this.imageUrl,
        bio: this.bio,
        traits: this.Traits.map(trait => trait.id)
      }
    }
  }
  
  return Character;
};