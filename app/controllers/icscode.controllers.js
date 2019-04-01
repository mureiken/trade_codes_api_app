const ICSCode = require('../models/icscode.model.js');

//Retrieve and return all ICS Codes frm the database.

exports.findAll = (req, res) => {
	ICSCode.find().sort( { value: 1 } ).select("-_id")
	.then(icscodes=>{
		res.send(icscodes);
	}).catch(err => {
		res.status(500).send({
			message: err.message || "some error occured while retrieving ICS Codes"
			});
	});
};

//Find a single ICS Code with a value field

exports.findOne = (req, res) => {
    ICSCode.find({label: new RegExp(req.params.label, "i")}).sort( { value: 1 } ).select("-_id")
    .then(icscode => {
        if(!icscode) {
            return res.status(404).send({
                message: "ICS Code not found with value " + req.params.label
            });            
        }
        res.send(icscode);
    }).catch(err => {
        if(err.kind === 'label') {
            return res.status(404).send({
                message: "ICS Code not found with value " + req.params.label
            });                
        }
        return res.status(500).send({
            message: "Error retrieving ICS Code with value " + req.params.label
        });
    });
};
