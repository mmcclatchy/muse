const express = require('express');
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../auth');
const { Trait, TraitType } = require('../../db/models');
const { normalize, sortTraits } = require('../../utilities')

const router = express.Router();


// Get all Character Traits and Trait Types
router.get('/',
  // requireAuth, 
  asyncHandler(async (req, res) => {
  const traits = await Trait.findAll({
    attributes: ['id', 'name', 'typeId'],
    include: [{
      model: TraitType,
      attributes: ['type']
    }]
  })
  
  const sortedTraits = sortTraits(traits)
  console.log('*******\n\nSORTED TRAITS: ', sortedTraits, '\n\n')
  
  res.json({ payload: sortedTraits })
}))


// Post a new character Trait
router.post('/', requireAuth, asyncHandler(async (req, res) => {
  
}));


module.exports = router