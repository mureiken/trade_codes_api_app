module.exports = (app) => {
	const wtomembers = require('../controllers/wtomember.controllers.js');

	//Retrieve all HS Codes
	app.get('/wtomembers',wtomembers.findAll);

	//Retrive a single HS Code with value field
	app.get('/wtomembers/:label',wtomembers.findOne);
}