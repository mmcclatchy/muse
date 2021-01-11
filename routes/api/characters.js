const express = require('express');
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../auth');
const { shapeAllForRedux } = require('../../utilities');
const { Character, CharacterTrait, Trait, TraitType } = require('../../db/models');

const router = express.Router();

router.get(
  '/',
  requireAuth,
  asyncHandler(async (req, res) => {
    const characters = await Character.findAll({
      include: [
        {
          model: Trait,
          attributes: ['id'],
          through: { attributes: [] },
          include: [
            {
              model: TraitType,
              attributes: ['type']
            }
          ]
        }
      ],
      attributes: ['id', 'firstName', 'lastName', 'imageUrl', 'bio']
    });
    
    res.json({ payload: shapeAllForRedux(characters) });
  })
);

router.post(
  '/',
  requireAuth,
  asyncHandler(async (req, res) => {
    const { 
      imageUrl, 
      bio, 
      firstName, 
      lastName, 
      physical, 
      strengths, 
      weaknesses,
      motivations,
      secrets,
    } = req.body;

    const character = await Character.create({
      imageUrl,
      bio,
    });

    const characterTraits = [
      { characterId: character.id, traitId: firstName.id },
      { characterId: character.id, traitId: lastName.id },
      { characterId: character.id, traitId: physical.id },
      { characterId: character.id, traitId: strengths.id },
      { characterId: character.id, traitId: weaknesses.id },
      { characterId: character.id, traitId: motivations.id },
      { characterId: character.id, traitId: secrets.id },
    ];

    await CharacterTrait.bulkCreate(characterTraits, {
      // ignoreDuplicates: true
    });

    const eagerCharacter = await Character.findOne({
      where: { id: character.id },
      attributes: ['id', 'firstName', 'lastName', 'imageUrl', 'bio'],
      include: [
        {
          model: Trait,
          attributes: ['id'],
          through: { attributes: [] },
        },
      ],
    });

    res.status(201).json(eagerCharacter.shapeForRedux());
  })
);

module.exports = router;
