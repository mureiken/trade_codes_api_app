const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//create express app
const app = express();
const cron = require('node-cron');
const shell = require('shelljs');

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// parse requests of content-type - application/json
app.use(bodyParser.json())

app.use(cors());
const corsOptions = {
  origin: 'http:/localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
//configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {useNewUrlParser: true})
.then(()=> {
	console.log("Succesfully connected to the database");
}).catch(err=> {
	console.log("Could not connect to the database. Exiting now...");
	process.exit();
});

//define simple route
app.get('/', (req,res)=> {
	res.json({"message": "This apps provides api end points to retrieve ICS Codes & HS Codes"});
});

//Require all our routes containing our api end points
require('./app/routes/hscode.routes.js')(app);
require('./app/routes/icscode.routes.js')(app);
require('./app/routes/wtomember.routes.js')(app);

app.listen(4000, ()=> {
	console.log('This server is listening on port 4000');
});

// cron.schedule('* * * * *', function(){
//    shell.exec(' node send-notifications.js')
// });