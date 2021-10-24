const jimp = require('jimp');
const s3Service = require('./s3Service');
const sqsService = require('./sqsService');
const filter = async event => {
    const s3Info = JSON.parse(event.Records[0].Sns.Message);
    const bucket = s3Info.Records[0].s3.bucket.name;
    const key = s3Info.Records[0].s3.object.key;
    const url = s3Service.getObjectSignedUrl(bucket, key);//PEGA O OBJETO NO S3
    const imagem = await jimp.read(url);//PEGA A IMAGEM
    const buffer = await imagem.greyscale().quality(80).getBufferAsync(jimp.MIME_JPEG);//FAZ O RESIZE DA IMAGEM
    const filterData = await s3Service.putObject(buffer, key);//ENVIA A IMAGEM PRETA E BRANCA PARA O S3
    filterData.eventType = "FILTER_EVENT";
    await sqsService.putMessage(filterData);//DISPARA O EVENTO DE CRIAÇÃO DE IMAGEM PRETA E BRANCA PARA A FILA DO SQS
}

module.exports = {
    filter: filter
}