module.exports = (app) => {
	const hscodes = require('../controllers/hscode.controllers.js');

	//Retrieve all HS Codes
	app.get('/hscodes',hscodes.findAll);

	//Retrive a single HS Code with value field
	app.get('/hscodes/:label',hscodes.findOne);
}