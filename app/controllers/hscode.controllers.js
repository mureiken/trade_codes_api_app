const HSCode = require('../models/hscode.model.js');

//Retrieve and return all HS Codes frm the database.

exports.findAll = (req, res) => {
	HSCode.find().sort( { value: 1 } ).select("-_id")
	.then(hscodes=>{
		res.send(hscodes);
	}).catch(err => {
		res.status(500).send({
			message: err.message || "some error occured while retrieving HS Codes"
			});
	});
};

//Find a single HS Code with a value field

exports.findOne = (req, res) => {
    HSCode.find({label: new RegExp(req.params.label, "i")}).sort( { value: 1 } ).select("-_id")
    .then(hscode => {
        if(!hscode) {
            return res.status(404).send({
                message: "HS Code not found with value " + req.params.label
            });            
        }
        res.send(hscode);
    }).catch(err => {
        if(err.kind === 'label') {
            return res.status(404).send({
                message: "HS Code not found with value " + req.params.label
            });                
        }
        return res.status(500).send({
            message: "Error retrieving HS Code with value " + req.params.label
        });
    });
};
