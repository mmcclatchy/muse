'use strict';
module.exports = (sequelize, DataTypes) => {
  const CharacterTrait = sequelize.define('CharacterTrait', {
    characterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    traitId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  CharacterTrait.associate = function(models) {
    // associations can be defined here
  };
  return CharacterTrait;
};