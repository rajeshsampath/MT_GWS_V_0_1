let userController = rootRequire('controllers/user');
let masterController = rootRequire('controllers/master');

module.exports.initialize = function(app) {	
	/*    --------------------------------------------------
		::User Controller - API's
	-------------------------------------------------- */
	app.use('/api/gws/user',userController);
	
	/*    --------------------------------------------------
		::Master Controller - API's
	-------------------------------------------------- */
	app.use('/api/gws/master',masterController);
	
	
}