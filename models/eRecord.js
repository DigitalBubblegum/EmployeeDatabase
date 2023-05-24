const mongoose = require('mongoose')
//do not save DB password to github
const empSchema = new mongoose.Schema({
	name: String,
	i_number: String,
	dep_number: String,
	desig: String,
	phone_num: String
})
empSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	},
})
// const Employee = mongoose.model('Employee',empSchema)
// const employee = new Employee({
// 	name: 'Alexander Alexos',
// 	i_number: 'AA1123344',
// 	dep_number: 'CDEV1',
// 	desig: 'Full Stack Developer',
// 	phone_num: '111222333444'
// })
// employee.save().then((result) => {
// 	console.log(result.message)
// 	mongoose.connection.close()
// })
module.exports = mongoose.model('Employee', empSchema)