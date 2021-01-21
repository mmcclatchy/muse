'use strict';


module.exports = (sequelize, DataTypes) => {
  const Character = sequelize.define(
    'Character',
    {
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imageKey: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bio: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
    },
    {}
  );
  
  Character.associate = function (models) {
    Character.belongsToMany(models.Scene, {
      through: models.SceneCharacter,
      foreignKey: 'characterId',
      otherKey: 'sceneId',
    });

    Character.hasMany(models.CharacterTrait, { 
      foreignKey: 'characterId',
      onDelete: 'CASCADE',
      hooks: true
    });
  };

  //*******************************************************/
  
    
  Character.prototype.shapeTraits = function () {
    const shapedTraits = {};
    
    this.CharacterTraits.forEach(characterTrait => {
      shapedTraits[characterTrait.Trait.TraitType.type] = characterTrait.Trait.id;
    });
    
    
    
    const shapedCharacter = {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      imageUrl: this.imageUrl,
      imageKey: this.imageKey,
      bio: this.bio,
      traits: shapedTraits
    };
    
    // console.log(`***\n\n${Object.entries(shapedCharacter)}\n\nTraits: ${Object.entries(shapedCharacter.traits)}\n\n***`)
    
  };

  return Character;
};
