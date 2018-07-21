/**
 *@description GWS->User Services
 *@author Fahid Mohammad
 *@email mec.fahid@gmail.com
 *@return Object<Router>
 */
//Load dependend modules
let express = require('express'),
	router = express.Router(),
	_ = require('lodash');

let userModule = rootRequire('lib/Users');

//Save User Data
router.post('/addUser', function(req, res) {
	var query = req.body;	
	userModule.addUser(query,function(err, responseData){
		if(!err) return res.json(responseData);
		res.json(err)
	})
});



//Export the controller
module.exports = router;