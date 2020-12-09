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
    avatarUrl: {
      type: DataTypes.STRING,
    },
    description: DataTypes.STRING
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
  return Character;
};