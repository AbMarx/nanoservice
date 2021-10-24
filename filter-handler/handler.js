'use strict';

const filterService = require('./service/filterService');

module.exports.filter = async (event) => {
  console.log("evento do sns recebido com sucesso: ", JSON.stringify(event));
  await filterService.filter(event);
  
  return { message: 'Filtro gerado com sucesso!', event };
};
