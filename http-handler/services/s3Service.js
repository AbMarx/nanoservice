const { LexModelBuildingService } = require('aws-sdk');
const AWS = require('aws-sdk');


AWS.config.update({
    region: 'us-east-1'
});

const S3 = new AWS.S3();
const BUCKET = 'nanoservice-images-20212';
const { v4: uuidv4 } = require('uuid');
const upload = event => {
    const id = uuidv4();
    return new Promise((res, rej) => {
        //REALIZA O UPLOAD DA IMAGEM NO S3
        S3.putObject({
            Bucket: BUCKET,
            Key: event.headers['username']+ '/' + id + '.jpg',
            Body: new Buffer(event.body.replace(/^data:image\/\w+;base64,/, ""), 'base64'),
            ContentEncoding: 'base64',
            ContentType: 'image/jpeg'
        }, (err) => {
            if(err){
                return rej(err);
            }
            return res({
                bucket: BUCKET,
                key: id + '.jpg'
            });
        });
    });
}

module.exports = {
    upload: upload
}