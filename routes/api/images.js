const express = require('express');
const asyncHandler = require('express-async-handler');
const AWS = require('aws-sdk');
const multer = require('multer');
const upload = multer();

const { awsKeys, jwtConfig: { secret } } = require('../../config/index');
const encryptor = require('simple-encryptor')(secret);

const { requireAuth } = require('../../auth');

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
    console.log('****\n\FILE: ', file, '\n\n*****')
    return
    const params = {
      Bucket: "app-muse",
      Key: Date.now().toString() + file.originalname,
      Body: file.buffer,
      ACL: "public-read",
      ContentType: file.mimetype,
    };
    
    console.log(`************
      Params: ${params}
      ***********************
    `)
    
    const promise = s3.upload(params).promise();
    const uploadedImage = await promise;
    
    console.log(`**********
      uploadedImage: 
      ${Object.entries(uploadedImage)}
      *********************
    `)
    
    const { Location: imageUrl, Key } = uploadedImage;
    
    console.log(`
      *************
        
        Image Url:
        ${imageUrl}
      
        KEY:  
        ${typeof Key}, ${Key}
        
      *************
    `)
    const imageKey = encryptor.encrypt(Key);
    console.log('\n\nABOUT TO RESPOND:', imageKey ,'\n\n')
    
    res.json({ payload: { imageUrl, imageKey }})
  })
)

router.put(
  '/:key',
  requireAuth,
  // upload.any(),
  fileFilter,
  asyncHandler(async (req, res) => {
    const encryptedKey = req.params.key;
    const key = encryptor.decrypt(encryptedKey);
    
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
    const { Location: imageUrl, Key: imageKey } = uploadedImage.Location;
    
    res.json({ payload: { imageUrl, imageKey: encryptor.encrypt(imageKey) }})
  })
)




module.exports = router;