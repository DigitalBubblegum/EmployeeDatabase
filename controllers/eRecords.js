const eRecordsRouter = require('express').Router()
const ERecord = require('../models/eRecord')
const logger = require('../utils/logger')
//fetch employee records from mongoDB
logger.info('running express')
eRecordsRouter.get('/', (request, response, next) => {
	logger.info(request.body)
	ERecord.find({})
		.then((record) => {
			logger.info(record)
			response.json(record)
		})
		.catch((error) => {
			next(error)
		})
})
//save employee records to mongoDB
// eRecordsRouter.post('/',(request,response,next) => {
// 	const body = request.body
// 	if (body === undefined) {
// 		return response.status(400).json({
// 			error:'one of the field you have entered was undefined'
// 		})
// 	}
// 	const eRecord = new ERecord({
// 		name: body.name,
// 		i_number: body.i_number,
// 		dep_number: body.dep_number,
// 		desig: body.desig,
// 		phone_num: body.phone_num,
// 	})
// 	logger.info(body.name)
// 	logger.info(body.i_number)
// 	logger.info(body.dep_number)
// 	logger.info(body.desig)
// 	logger.info(body.phone_num)
// 	eRecord.save()
// 		.then(savedrecord => {
// 			response.json(savedrecord)
// 			logger.info('saved not to db')
// 		})
// 		.catch(error => next(error))
// })


module.exports = eRecordsRouter