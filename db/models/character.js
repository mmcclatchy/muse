'use strict';


const { jwtConfig: { secret } } = require('../../config/index');
const encryptor = require('simple-encryptor')(secret);

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
    
    const encryptedKey = encryptor.encrypt(this.imageKey);
    
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      imageUrl: this.imageUrl,
      imageKey: encryptedKey,
      bio: this.bio,
      traits: shapedTraits
    };
  };

  return Character;
};
