'use strict';

const thumbnailService = require('./service/thumbnailService');

module.exports.thumbnail = async (event) => {
  console.log("evento do sns recebido com sucesso: ", JSON.stringify(event));
  await thumbnailService.thumbnail(event);
  
  return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
