module.exports = (app) => {
	const icscodes = require('../controllers/icscode.controllers.js');

	//Retrieve all HS Codes
	app.get('/icscodes',icscodes.findAll);

	//Retrive a single HS Code with value field
	app.get('/icscodes/:label',icscodes.findOne);
}