const express = require('express');
const sequelize = require('sequelize');
const asyncHandler = require('express-async-handler');

const { requireAuth } = require('../../auth');
const { shapeAllForRedux, normalize } = require('../../utilities');
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
      attributes: ['id', 'imageUrl', 'bio']
    });
    
    res.json({ payload: shapeAllForRedux(characters) });
  })
);

router.post(
  '/',
  requireAuth,
  asyncHandler(async (req, res) => {
    console.log('***\n\nPOST CHARACTER\n\n***')
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
      attributes: ['id', 'imageUrl', 'bio'],
      include: [
        {
          model: Trait,
          attributes: ['id'],
          through: { attributes: [] },
          include: [{
            model: TraitType,
            attributes: ['type']
          }]
        },
      ],
    });

    res.status(201).json({ 
      payload: normalize(eagerCharacter.shapeTraits()), 
      status: 'success' 
    });
  })
);


router.put(
  '/:id',
  requireAuth,
  asyncHandler(async (req, res) => {
    const characterId = parseInt(req.params.id, 10);
    
    try {
      await sequelize.transaction(async (t) => {
        const character = await Character.findOne({
          where: { id: characterId },
          include: [{
            model: Trait,
            
          }]
        });
        
        await character.setImageUrl(req.body.imageUrl, { transaction: t });
        await character.setBio(req.body.bio, { transaction: t });
        character.save();
        
        for (const [traitId, newTraitId] of Object.entries(req.body.traits)) {
          const characterTrait = await CharacterTrait.findOne({
            where: { characterId, traitId }
          });
          
          await characterTrait.setTraitId(newTraitId, { transaction: t });
        }        
      });
      
      const updatedCharacter = await Character.findOne({
        where: { id: characterId },
        attributes: ['id', 'imageUrl', 'bio'],
        include: [{
          model: Trait,
          attributes: ['id'],
          through: { attributes: [] },
        }]
      });
      
      res.json(normalize(updatedCharacter.shapeTraits()));
      
    } catch (e) {
      console.log(`*****\n\nERROR: \n\n${e}\n\n*****`);
      res.status(500)
    }
  })
)


router.delete(
  '/:id',
  requireAuth,
  asyncHandler(async (req, res) => {
    const characterId = parseInt(req.params.id, 10);
    
    await CharacterTrait.destroy({ where: { characterId }})
    
    const character = await Character.findByPk(characterId);
    await character.destroy()
    
    res.status(200).json({ payload: characterId, status: 'deleted' })
  })
)


module.exports = router;
