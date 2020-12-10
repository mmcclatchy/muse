const express = require('express');
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../auth');
const { sortTraits, normalize } = require('../../utilities');
const { Character, Trait, CharacterTrait } = require('../../db/models');

const router = express.Router();

router.get(
  '/',
  requireAuth,
  asyncHandler(async (req, res) => {
    const characters = Character.findAll();
    res.json(normalize(characters));
  })
);

router.post(
  '/',
  // requireAuth,
  asyncHandler(async (req, res) => {
    data = req.body
    
    for (let datum in data) {
      if (data[datum].type) delete data[datum].type
    }
    console.log('*******\n\n', data, '\n\n*********')
    console.log(`
      ${data.firstName.name}
      ${data.lastName.name}
      ${data.imageUrl}
      ${data.bio}
      ${data.physical.id}
      ${data.strengths.id}
      ${data.weaknesses.id}
      ${data.motivations.id}
      ${data.secrets.id}
    `)
    
    const character = await Character.create({
      firstName: data.firstName.name,
      lastName: data.lastName.name,
      imageUrl: data.imageUrl,
      bio: data.bio,
      // traits: [
      //   data.physical.id,
      //   data.strengths.id,
      //   data.weaknesses.id,
      //   data.motivations.id,
      //   data.secrets.id
      // ]
    }, 
    // {
    //   include: [{
    //     association: Trait,
    //     as: 'traits'
    //   }]
    // }
    );
    
    console.log('CHARACTER: ', character)
    // character.setTraits([
    //   data.physical.id,
    //   data.strengths.id,
    //   data.weaknesses.id,
    //   data.motivations.id,
    //   data.secrets.id
    // ])
    // character.save()
    
    const traitsIds = [
      data.physical.id,
      data.strengths.id,
      data.weaknesses.id,
      data.motivations.id,
      data.secrets.id
    ];
    console.log('********\n\nTraitIds: ', traitsIds, '\n\n************')
    const traits = traitsIds.map(async traitId => {
      const characterTrait = await CharacterTrait.create({
        characterId: character.id,
        traitId: traitId
      }, {
        include: [Trait]
      });
      return characterTrait
    })
    console.log('*********\n\n', traits, '\n\n***********')
    character.traits = sortTraits(traits)
    
    res.status(201).json(normalize(character))
  })
);

module.exports = router;
