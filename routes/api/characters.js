const express = require('express');
const asyncHandler = require('express-async-handler');
const { Op } = require('sequelize');
const AWS = require('aws-sdk');
const multer = require('multer');
const upload = multer();

const { awsKeys } = require('../../config/index')
const { requireAuth } = require('../../auth');
const { shapeAllForRedux, normalize } = require('../../utilities');
const { Character, CharacterTrait, Trait, TraitType } = require('../../db/models');
const db = require('../../db/models/index')

const router = express.Router();



//*********************** AWS Setup ****************************/

AWS.config.update({
  secretAccessKey: awsKeys.secretAccessKey,
  accessKeyId: awsKeys.accessKeyId,
  region: awsKeys.region,
});

const s3 = new AWS.S3();

const fileFilter = (req, res, next) => {
  const file = req.files[0];
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    next();
  } else {
    next({ status: 422, errors: ["Invalid Mime Type: JPEG and PNG only"] });
  }
};



//***********************  Routes  *****************************/

router.get(
  '/',
  requireAuth,
  asyncHandler(async (req, res) => {
    const characters = await Character.findAll({
      attributes: ['id', 'imageUrl', 'imageKey', 'bio'],
      include: [
        {
          model: CharacterTrait,
          attributes: ['id'],
          include: [
            {
              model: Trait,
              attributes: ['id'],
              include: [
                {
                  model: TraitType,
                  attributes: ['type'],
                }
              ]
            }
          ]
        }
      ]
    });
    
    res.json({ payload: shapeAllForRedux(characters) });
  })
);

router.post(
  '/',
  requireAuth,
  asyncHandler(async (req, res) => {
    
    // Parse character data from request
    const { 
      imageUrl,
      imageKey,
      bio, 
      firstName, 
      lastName, 
      physical, 
      strengths, 
      weaknesses,
      motivations,
      secrets,
    } = req.body;
    
    // Create character in db
    const character = await Character.create({
      imageUrl,
      imageKey,
      bio,
    });
    
    // Create array to bulkCreate all character traits
    const characterTraits = [
      { characterId: character.id, traitId: firstName.id },
      { characterId: character.id, traitId: lastName.id },
      { characterId: character.id, traitId: physical.id },
      { characterId: character.id, traitId: strengths.id },
      { characterId: character.id, traitId: weaknesses.id },
      { characterId: character.id, traitId: motivations.id },
      { characterId: character.id, traitId: secrets.id },
    ];

    await CharacterTrait.bulkCreate(characterTraits, {});

    /*  
        Get character again with all relevant data
        
        NOTE: I considered several ways to do this attempting to avoid
        accessing the db twice for the same character, but due to needing 
        each trait's type, this seemed to be the least expensive alternative
        
        TODO: Attempt to build the character, setTraits, and get all data on the save
    */
    const eagerCharacter = await Character.findOne({
      where: { id: character.id },
      attributes: ['id', 'imageUrl', 'bio'],
      include: [
        {
          model: CharacterTrait,
          attributes: ['id'],
          include: [
            {
              model: Trait,
              attributes: ['id'],
              include: [
                {
                  model: TraitType,
                  attributes: ['type'],
                }
              ]
            }
          ]
        }
      ]
    });
    // console.log(`****\n\nEagerCharacter: ${eagerCharacter}\n\n${eagerCharacter.imageUrl}\n\n****`)

    res.status(201).json({ 
      payload: normalize(eagerCharacter.shapeTraits()), 
      status: 'success' 
    });
  })
);


router.patch(
  '/:id',
  requireAuth,
  asyncHandler(async (req, res) => {
    const characterId = parseInt(req.params.id, 10);
    const { imageUrl, bio, oldTraits, newTraits } = req.body;
    
  
      // const updatedCharacter = 
      await db.sequelize.transaction(async (t) => {
        const character = await Character.findOne({
          where: { id: characterId },
          attributes: ['id', 'imageUrl', 'bio']
        });
        
        if (imageUrl) character.imageUrl = imageUrl;
        if (bio) character.bio = bio;
        
        const characterTraits = await CharacterTrait.findAll({
          where: {
            characterId,
            traitId: {
              [Op.or]: oldTraits
            },
          },
        });
        
        
        for (let i = 0; i < characterTraits.length; i++) {
          characterTraits[i].traitId = newTraits[i];
          characterTraits[i].save();
        }
        
        character.save()
        // return character;
      });
      
      const updatedCharacter = await Character.findOne({
        where: { id: characterId },
        attributes: ['id', 'imageUrl', 'bio'],
        include: [
          {
            model: CharacterTrait,
            attributes: ['id'],
            include: [
              {
                model: Trait,
                attributes: ['id'],
                include: [
                  {
                    model: TraitType,
                    attributes: ['type'],
                  }
                ]
              }
            ]
          }
        ]
      });
      
      res.json({ payload: normalize(updatedCharacter.shapeTraits()), status: 'updated' });
      
  })
)


router.delete(
  '/:id',
  requireAuth,
  asyncHandler(async (req, res) => {
    const characterId = parseInt(req.params.id, 10);
    
    await CharacterTrait.destroy({ where: { characterId }, truncate: true });
    
    const character = await Character.findByPk(characterId);
    
    const deleteParams = { Bucket: 'app-muse', Key: key };
    await s3.deleteObject(deleteParams).promise();
        
    await character.destroy({ truncate: true });
    
    res.status(200).json({ payload: characterId, status: 'deleted' })
  })
)


module.exports = router;
