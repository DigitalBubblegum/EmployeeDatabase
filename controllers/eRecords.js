const eRecordsRouter = require('express').Router()
const Employee = require('../models/eRecord')
const logger = require('../utils/logger')
//fetch employee records from mongoDB
eRecordsRouter.get('/', (request, response, next) => {
	Employee.find({})
		.then((record) => {
			response.json(record)
		})
		.catch((error) => {
			next(error)
		})
})
// save employee records to mongoDB
eRecordsRouter.post('/',(request,response,next) => {
	const body = request.body
	if (body === undefined) {
		return response.status(400).json({
			error:'one of the field you have entered was undefined'
		})
	}
	const eRecord = new Employee({
		name: body.name,
		i_number: body.i_number,
		dep_number: body.dep_number,
		desig: body.desig,
		phone_num: body.phone_num,
	})
	eRecord.save()
		.then(savedrecord => {
			response.json(savedrecord)
			logger.info('saved person to db')
		})
		.catch(error => next(error))
})
//fetch employee records by id from mongodb
eRecordsRouter.get('/:id',(request,response,next) => {
	Employee.findById(request.params.id)
		.then((record) => {
			if(record){
				response.json(record)
			}
			else{
				response.status(404).end()
			}
		}).catch((error) => next(error))
})
module.exports = eRecordsRouter