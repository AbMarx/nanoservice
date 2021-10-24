const jimp = require('jimp');
const s3Service = require('./s3Service');
const sqsService = require('./sqsService');
const thumbnail = async event => {
    const s3Info = JSON.parse(event.Records[0].Sns.Message);
    const bucket = s3Info.Records[0].s3.bucket.name;
    const key = s3Info.Records[0].s3.object.key;
    const url = s3Service.getObjectSignedUrl(bucket, key);//PEGA O OBJETO NO S3
    console.log(url);
    const imagem = await jimp.read(url);//PEGA A IMAGEM
    const buffer = await imagem.resize(100,100).quality(80).getBufferAsync(jimp.MIME_JPEG);//FAZ O RESIZE DA IMAGEM
    const thumbnailData = await s3Service.putObject(buffer, key);//ENVIA IMAGEM PARA O S3
    thumbnailData.eventType = 'THUMBNAIL_EVENT';
    await sqsService.putMessage(thumbnailData);//ENVIA O EVENTO DE CRIAÇÃO DO THUMBNAIL PARA O SQS
}

module.exports = {
    thumbnail: thumbnail
}