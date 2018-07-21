const Models = rootRequire('models/index');

module.exports = {
	addUser: function(query, callback) {
		Models['USERS.UserSchema'].addUser(query, function(err, res){
			console.log('err',err);
			if(!err) return callback(null, {status: res.status});
			return callback({status: err.status},null)
		});
	},
	updateUser: function(query, callback) {},
	removeUser: function(query, callback) {}
};
