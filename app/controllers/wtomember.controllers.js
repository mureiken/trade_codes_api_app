const wtoMember = require('../models/wtomember.model.js');

//Retrieve and return all WTO Members frm the database.

exports.findAll = (req, res) => {
	wtoMember.find().sort( { value: 1 } ).select("-_id")
	.then(wtomembers=>{
		res.send(wtomembers);
	}).catch(err => {
		res.status(500).send({
			message: err.message || "some error occured while retrieving WTO Members"
			});
	});
};

//Find a single WTO Member with a value field

exports.findOne = (req, res) => {
    wtoMember.find({label: new RegExp(req.params.label, "i")}).sort( { value: 1 } ).select("-_id")
    .then(wtomember => {
        if(!wtomember) {
            return res.status(404).send({
                message: "WTO member not found with value " + req.params.label
            });            
        }
        res.send(wtomember);
    }).catch(err => {
        if(err.kind === 'label') {
            return res.status(404).send({
                message: "WTO Member  not found with value " + req.params.label
            });                
        }
        return res.status(500).send({
            message: "Error retrieving WTO Member with value " + req.params.label
        });
    });
};
