const mongoose = require('mongoose');

const ICSCodeShema = mongoose.Schema({
		value: String,
		label: String
	}); 

module.exports = mongoose.model ('ICSCode', ICSCodeShema)