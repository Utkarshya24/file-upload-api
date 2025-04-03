const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const dotenv = require('dotenv');

dotenv.config();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const uploadToS3 = async (file) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: `${Date.now()}-${file.originalname}`, // Unique filename
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read', // Make file publicly accessible
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);

  // Return the file URL
  return {
    Key: params.Key,
    Location: `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`,
  };
};

const deleteFromS3 = async (key) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
  };

  const command = new DeleteObjectCommand(params);
  await s3Client.send(command);
};

module.exports = { uploadToS3, deleteFromS3 };