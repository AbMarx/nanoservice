'use strict';

const rekognitionService = require("./service/rekognitionService");
const sqsService = require("./service/sqsService");

module.exports.tag = async (event, context) => {
  const s3Info = JSON.parse(event.Records[0].Sns.Message);
  const bucket = s3Info.Records[0].s3.bucket.name;
  const key = s3Info.Records[0].s3.object.key;
  
  const labels = await rekognitionService.detectLabels(bucket,key);//PEGA AS LABELS DO OBJETO DO S3
  //MONTA OBJETO A SER ENVIADO AO SQS
  const item = {};
  item.key = key;
  item.labels = labels;
  item.eventType = "TAG_EVENT";
  await sqsService.putMessage(item);//DISPARA ESSE EVENTO PARA A FILA DO SQS

  return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
