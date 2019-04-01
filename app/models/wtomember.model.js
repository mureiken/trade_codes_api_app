const mongoose = require('mongoose');

const wtoMemberShema = mongoose.Schema({
		value: String,
		label: String
	}); 

module.exports = mongoose.model ('wtoMember', wtoMemberShema)

// mongoimport --db WTO --collection wtoMembers --file /Users/kamaumurei/Desktop/jsonfiles/wtoMembers.json --jsonArray