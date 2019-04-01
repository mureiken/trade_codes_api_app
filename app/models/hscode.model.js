const mongoose = require('mongoose');

const HSCodeShema = mongoose.Schema({
		value: String,
		label: String
	}); 

module.exports = mongoose.model ('HSCode', HSCodeShema)