const aws = require("aws-sdk");
const endpoint = new aws.Endpoint(process.env.ENDPOINT);

const s3 = new aws.S3({
  endpoint,
  credentials: {
    accessKeyId: process.env.KEY_ID,
    secretAccessKey: process.env.APP_KEY,
  },
});

const uploadFile = async (path: string, buffer: Buffer, mimetype: string) => {
  const arquivo = await s3
    .upload({
      Bucket: process.env.BUCKET_NAME,
      Key: path,
      Body: buffer,
      ContentType: mimetype,
    })
    .promise();

  return {
    url: arquivo.Location,
    path: arquivo.Key,
  };
};

const deleteFile = async (path: string) => {
  await s3
    .deleteObject({
      Bucket: process.env.BUCKET_NAME,
      Key: path,
    })
    .promise();
};

export { uploadFile, deleteFile };
