const jimp = require('jimp');
const s3Service = require('./s3Service');
const thumbnail = async event => {
    const s3Info = JSON.parse(event.Records[0].Sns.Message);
    const bucket = s3Info.Records[0].s3.bucket.name;
    const key = s3Info.Records[0].s3.object.key;
    const url = s3Service.getObject(bucket, key);//PEGA O OBJETO NO S3
    const imagem = await jimp.read(url);//PEGA A IMAGEM
    const buffer = await imagem.resize(100,100).quality(80).getBufferAsync(jimp.MIME_JPEG);//FAZ O RESIZE DA IMAGEM
    await s3Service.putObject(buffer, key);
}

module.exports = {
    thumbnail: thumbnail
}