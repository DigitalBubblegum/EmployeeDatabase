const config = require('./utils/config')
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const eRecordsRouter = require('./controllers/eRecords')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

morgan.token('mes', function getMes(request) {
	return JSON.stringify(request.body)
})

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

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :mes'))
app.use(middleware.requestLogger)
app.use('/api/records', eRecordsRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
module.exports = app
