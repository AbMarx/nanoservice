'use strict';

const s3Service = require('./services/s3Service');
const dynamodbService = require('./services/dynamodbService');

module.exports.upload = async (event) => {
  const item = await s3Service.upload(event);
  await dynamodbService.put(item);
  return {
    statusCode: 200,
    body: JSON.stringify(item),
  };
};
