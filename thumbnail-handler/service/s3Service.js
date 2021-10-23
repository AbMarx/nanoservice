const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-1'
})

const BUCKET = 'nanoservices-imagens-thumbnail-2021';
const s3 = new AWS.S3();

//PEGA A IMAGEM DO S3
const getObject = (bucket, key) =>{
    const signedUrlExpireSeconds = 60 * 5

    const url = s3.getSignedUrl('getObject', {
        Bucket: bucket,
        Key: key,
        Expires: signedUrlExpireSeconds
    });

    return url;
}

const putObject = (buffer, filename) => {
    return new Promise((res, rej) => {
        s3.putObject({
            Bucket: BUCKET,
            Key: filename,
            Body: buffer
        }, (err, data) => {
            if (err) {
                return rej(err);
            }
            return res({
                bucket: BUCKET,
                key: filename
            });
        })
    });
}

module.exports = {
    getObject: getObject,
    putObject: putObject
}