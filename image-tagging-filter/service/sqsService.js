const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-1'
})

const sqs = new AWS.SQS();

//AO REALIZAR A CRIAÇÃO DO THUMBNAIL, ENCAMINHA ESSE EVENTO PARA A FILA DO SQS
const putMessage = message =>{
    return new Promise((res,rej) =>{
        sqs.sendMessage({
            QueueUrl: 'https://sqs.us-east-1.amazonaws.com/593072015542/post-processing-image-queue',
            MessageBody: JSON.stringify(message)
        }, (err, data) => {
            if(err){
                return rej(err);
            }
            return res(data);
        });
    });
}

module.exports = {
    putMessage:putMessage
}