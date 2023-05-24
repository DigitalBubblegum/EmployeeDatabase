const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
//add router here
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery',false)
const url = process.env.MONGODB_URI
logger.info('connecting to', config.MONGODB_URI)

mongoose
	.connect(url)
	.then(() => {
		logger.info('connected to MongoDB')
	})
	.catch((error) => {
		logger.error('error connecting to MongoDB:', error.message)
	})
app.use(cors)
app.use(express.json())
app.use(middleware.requestLogger)
//add emprouter here
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
module.exports = app