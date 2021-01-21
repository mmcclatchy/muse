const express = require('express');
const asyncHandler = require('express-async-handler');
const AWS = require('aws-sdk');
const multer = require('multer');
const upload = multer();

const { awsKeys } = require('../../config/index');
const { requireAuth } = require('../../auth');
const { Character } = require('../../db/models')

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
  } 
  else {
    next({ status: 422, errors: ["Invalid Mime Type: JPEG and PNG only"] });
  }
};


//***********************  Routes  *****************************/

router.post(
  '/',
  requireAuth,
  upload.any(),
  fileFilter,
  asyncHandler(async (req, res) => {
    // Post image to S3 bucket
    const file = req.files[0];
    
    const params = {
      Bucket: "app-muse",
      Key: Date.now().toString() + file.originalname,
      Body: file.buffer,
      ACL: "public-read",
      ContentType: file.mimetype,
    };
    
    const promise = s3.upload(params).promise();
    const uploadedImage = await promise;
    const { Location: imageUrl, Key: imageKey } = uploadedImage;
    
    res.json({ payload: { imageUrl, imageKey }})
  })
)

router.put(
  '/:key/:characterId',
  requireAuth,
  upload.any(),
  fileFilter,
  asyncHandler(async (req, res) => {
    const { key, characterId } = req.params;
    const id = parseInt(characterId, 10);
    
    const character = await Character.findByPk(id);
    
    const deleteParams = { Bucket: 'app-muse', Key: key };
    const deleteRes = await s3.deleteObject(deleteParams).promise();
    
    // Post image to S3 bucket
    const file = req.files[0];
    const params = {
      Bucket: "app-muse",
      Key: Date.now().toString() + file.originalname,
      Body: file.buffer,
      ACL: "public-read",
      ContentType: file.mimetype,
    };
    
    const uploadedImage = await s3.upload(params).promise();
    const { Location: imageUrl, Key: imageKey } = uploadedImage;
    
    character.imageUrl = imageUrl;
    character.imageKey = imageKey;
    
    character.save();
    
    res.json({ payload: { imageUrl, imageKey, characterId }})
  })
)




module.exports = router;